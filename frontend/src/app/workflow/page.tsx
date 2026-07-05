"use client";

import { motion } from 'framer-motion';
import { Terminal, Database, Send, Inbox, List, Info, Copy, Check } from 'lucide-react';
import { useState } from 'react';

const workflowSteps = [
  {
    title: "1. Create a Topic",
    description: "A topic is a category or feed name to which records are published. You must create a topic before you can produce or consume messages.",
    command: "kafka-topics.sh --create --topic my-topic --partitions 3 --replication-factor 1 --bootstrap-server kafka:9092",
    icon: <Database className="w-6 h-6 text-orange-500" />
  },
  {
    title: "2. List Topics",
    description: "Verify that your topic was created successfully by listing all available topics in the Kafka cluster.",
    command: "kafka-topics.sh --list --bootstrap-server kafka:9092",
    icon: <List className="w-6 h-6 text-blue-500" />
  },
  {
    title: "3. Produce Messages",
    description: "Send data to your topic. The producer will connect to the broker and append your message to the end of a partition.",
    command: "echo \"Hello Kafka\" | kafka-console-producer.sh --topic my-topic --bootstrap-server kafka:9092",
    icon: <Send className="w-6 h-6 text-green-500" />
  },
  {
    title: "4. Consume Messages",
    description: "Read messages from your topic. Using '--from-beginning' ensures you read all historical messages stored in the partition.",
    command: "kafka-console-consumer.sh --topic my-topic --from-beginning --bootstrap-server kafka:9092",
    icon: <Inbox className="w-6 h-6 text-purple-500" />
  },
  {
    title: "5. Describe a Topic",
    description: "View detailed metadata about a topic, including its partitions, leader broker, and In-Sync Replicas (ISR).",
    command: "kafka-topics.sh --describe --topic my-topic --bootstrap-server kafka:9092",
    icon: <Info className="w-6 h-6 text-yellow-500" />
  },
  {
    title: "6. Delete a Topic",
    description: "Remove a topic and all of its associated data from the cluster permanently.",
    command: "kafka-topics.sh --delete --topic my-topic --bootstrap-server kafka:9092",
    icon: <Terminal className="w-6 h-6 text-red-500" />
  }
];

export default function WorkflowPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (command: string, index: number) => {
    navigator.clipboard.writeText(command);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Kafka Commands <span className="text-orange-500">Workflow</span></h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          A step-by-step cheatsheet for the most essential Apache Kafka operations. Copy these commands and try them out in our interactive Terminal Emulator!
        </p>
      </motion.div>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-white/10 hidden md:block"></div>

        <div className="space-y-12">
          {workflowSteps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex flex-col md:flex-row gap-8 items-start"
            >
              <div className="hidden md:flex relative z-10 w-16 h-16 rounded-full bg-[#121212] border-2 border-white/10 items-center justify-center shadow-lg">
                {step.icon}
              </div>
              
              <div className="glass-panel p-6 rounded-2xl flex-grow w-full group hover:border-orange-500/50 transition-colors">
                <div className="flex items-center gap-3 mb-3 md:hidden">
                  {step.icon}
                  <h3 className="text-2xl font-bold">{step.title}</h3>
                </div>
                <h3 className="hidden md:block text-2xl font-bold mb-3">{step.title}</h3>
                
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {step.description}
                </p>

                <div className="relative">
                  <pre className="bg-black/50 p-4 rounded-xl font-mono text-sm text-green-400 overflow-x-auto border border-white/5">
                    {step.command}
                  </pre>
                  <button 
                    onClick={() => handleCopy(step.command, index)}
                    className="absolute top-1/2 -translate-y-1/2 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    title="Copy command"
                  >
                    {copiedIndex === index ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <Copy className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
