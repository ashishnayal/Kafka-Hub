"use client";

import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Terminal as TerminalIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface CommandHistory {
  command: string;
  output: string;
  exitCode: number;
}

export default function TerminalPage() {
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [currentCommand, setCurrentCommand] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);
  const endOfTerminalRef = useRef<HTMLDivElement>(null);

  // Focus input on click anywhere in terminal
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endOfTerminalRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isExecuting]);

  const handleExecute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCommand.trim()) return;

    if (currentCommand.trim() === 'clear') {
      setHistory([]);
      setCurrentCommand("");
      return;
    }

    const newCmd = currentCommand;
    setCurrentCommand("");
    setIsExecuting(true);

    try {
      const res = await axios.post('http://localhost:8080/api/terminal/execute', {
        command: newCmd
      });
      
      setHistory(prev => [...prev, {
        command: newCmd,
        output: res.data.output,
        exitCode: res.data.exitCode
      }]);
    } catch (error: any) {
      setHistory(prev => [...prev, {
        command: newCmd,
        output: "Failed to connect to Terminal API: " + error.message,
        exitCode: 1
      }]);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 h-[calc(100vh-4rem)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-3 text-white">
          <TerminalIcon className="w-8 h-8 text-orange-500" />
          Kafka Terminal Emulator
        </h1>
        <p className="text-gray-400 mt-2">
          Run actual Kafka shell commands against a live broker. Try: <code className="text-orange-400">kafka-topics.sh --list --bootstrap-server kafka:9092</code>
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-grow bg-[#0c0c0c] border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col font-mono text-sm shadow-orange-500/5 relative"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Terminal Header */}
        <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          <span className="ml-4 text-gray-500 text-xs">root@kafkahub:~</span>
        </div>

        {/* Terminal Body */}
        <div className="flex-grow p-4 overflow-y-auto">
          <div className="text-green-500 mb-6">
            Welcome to the Kafka Hub Sandbox.<br/>
            Type 'clear' to clear the console.<br/>
            Timeout for commands is 5 seconds.
          </div>

          {history.map((item, index) => (
            <div key={index} className="mb-4">
              <div className="flex gap-2 text-white">
                <span className="text-orange-500">root@kafkahub:/#</span>
                <span>{item.command}</span>
              </div>
              {item.output && (
                <pre className={`mt-1 whitespace-pre-wrap ${item.exitCode !== 0 ? 'text-red-400' : 'text-gray-300'}`}>
                  {item.output}
                </pre>
              )}
            </div>
          ))}

          <form onSubmit={handleExecute} className="flex gap-2 text-white">
            <span className="text-orange-500">root@kafkahub:/#</span>
            <input
              ref={inputRef}
              type="text"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              disabled={isExecuting}
              className="flex-grow bg-transparent outline-none border-none text-white placeholder-gray-600"
              placeholder={isExecuting ? "Executing..." : "Enter command..."}
              autoFocus
            />
          </form>
          {isExecuting && (
            <div className="mt-2 text-orange-400 animate-pulse">Running command...</div>
          )}
          <div ref={endOfTerminalRef} />
        </div>
      </motion.div>
    </div>
  );
}
