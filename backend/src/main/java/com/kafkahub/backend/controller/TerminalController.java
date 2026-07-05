package com.kafkahub.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/terminal")
@CrossOrigin(origins = "*")
public class TerminalController {

    public static class CommandRequest {
        private String command;
        public String getCommand() { return command; }
        public void setCommand(String command) { this.command = command; }
    }

    public static class CommandResponse {
        private String output;
        private int exitCode;

        public CommandResponse(String output, int exitCode) {
            this.output = output;
            this.exitCode = exitCode;
        }
        public String getOutput() { return output; }
        public int getExitCode() { return exitCode; }
    }

    @PostMapping("/execute")
    public ResponseEntity<CommandResponse> executeCommand(@RequestBody CommandRequest request) {
        String cmd = request.getCommand() != null ? request.getCommand().trim() : "";
        
        if (cmd.isEmpty()) {
            return ResponseEntity.ok(new CommandResponse("", 0));
        }

        // Basic security validation
        if (!cmd.startsWith("kafka-") && !cmd.startsWith("echo ") && !cmd.startsWith("clear")) {
            return ResponseEntity.ok(new CommandResponse("Error: Only kafka-* and echo commands are permitted in this sandbox.", 1));
        }

        String[] dangerousKeywords = {"rm", "mv", "wget", "curl", "apt", "apk", "su", "sudo", ">", ">>", ".." };
        for (String keyword : dangerousKeywords) {
            if (cmd.contains(" " + keyword) || cmd.contains(keyword + " ")) {
                return ResponseEntity.ok(new CommandResponse("Error: Unauthorized command token detected.", 1));
            }
        }

        // We execute in /opt/kafka so local bin scripts work, or use absolute paths.
        // Wait, kafka scripts are in /opt/kafka/bin.
        // Let's ensure the path is correct. If the user typed "kafka-topics.sh", we might need to prepend /opt/kafka/bin/
        // But running in bash should find it if it's in PATH. Our Dockerfile didn't add it to PATH.
        // We'll wrap it in a bash script that sets PATH or just replace "kafka-" with "/opt/kafka/bin/kafka-"
        
        // Quick trick: run bash -c with PATH updated
        String fullCmd = "export PATH=$PATH:/opt/kafka/bin; " + cmd;

        try {
            ProcessBuilder processBuilder = new ProcessBuilder("bash", "-c", fullCmd);
            processBuilder.redirectErrorStream(true); // merge stderr into stdout
            Process process = processBuilder.start();

            // Setup a 5 second timeout (critical for hanging consumers)
            boolean finished = process.waitFor(5, TimeUnit.SECONDS);

            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String output = reader.lines().collect(Collectors.joining("\n"));

            if (!finished) {
                process.destroyForcibly();
                output += "\n\n[Process timed out after 5 seconds. This is normal for continuous consumers.]";
                return ResponseEntity.ok(new CommandResponse(output, 0));
            }

            return ResponseEntity.ok(new CommandResponse(output, process.exitValue()));

        } catch (Exception e) {
            return ResponseEntity.ok(new CommandResponse("Execution Error: " + e.getMessage(), 1));
        }
    }
}
