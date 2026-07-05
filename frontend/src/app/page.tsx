"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Code, Database, Zap, Terminal as TerminalIcon, ShieldCheck, Activity, BookOpen } from "lucide-react";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div ref={containerRef} className="flex flex-col min-h-screen relative overflow-hidden">
      
      {/* Background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-orange-500/10 blur-[120px] pointer-events-none fixed" />
      <div className="absolute top-[40%] right-[-10%] w-[30%] h-[50%] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none fixed" />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 sm:px-6 lg:px-8 relative z-10 pt-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-5xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 text-sm font-medium text-orange-400">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
            </span>
            Kafka Hub Sandbox v2.0 Live
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
            Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">Apache Kafka</span> <br/> Like a Senior Engineer
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            The ultimate platform to learn event streaming. Master core concepts, practice in a live sandbox terminal, and crush your system design interviews.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/learn">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-full transition-all duration-300 flex items-center gap-3 overflow-hidden shadow-[0_0_40px_rgba(249,115,22,0.3)] hover:shadow-[0_0_60px_rgba(249,115,22,0.5)] hover:-translate-y-1">
                <span className="relative z-10 flex items-center gap-2">
                  Start the Course <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </Link>
            <Link href="/terminal">
              <button className="px-8 py-4 glass-panel hover:bg-white/10 text-white font-bold rounded-full transition-all duration-300 flex items-center gap-2 hover:-translate-y-1">
                <TerminalIcon className="w-5 h-5 text-gray-300" />
                Open Live Terminal
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-black/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Your Learning Journey</h2>
            <p className="text-gray-400 text-lg">A complete ecosystem to take you from beginner to expert.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Learn the Core", desc: "Read detailed, interactive lessons on Brokers, Zookeeper, KRaft, Partitions, and Consumer Groups.", icon: <BookOpen className="w-8 h-8 text-blue-400" /> },
              { step: "02", title: "Practice Live", desc: "Use our embedded Terminal Emulator hooked up to a real Kafka cluster to run shell commands.", icon: <TerminalIcon className="w-8 h-8 text-orange-400" /> },
              { step: "03", title: "Ace Interviews", desc: "Review 15+ curated interview questions ranging from basics to Exactly-Once Semantics (EOS).", icon: <ShieldCheck className="w-8 h-8 text-green-400" /> }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="glass-panel p-8 rounded-2xl relative overflow-hidden group hover:border-orange-500/50 transition-colors duration-500"
              >
                <div className="absolute top-[-20%] right-[-10%] text-9xl font-black text-white/5 group-hover:text-orange-500/10 transition-colors duration-500 pointer-events-none">
                  {item.step}
                </div>
                <div className="mb-6">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Showcase */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            style={{ y: y1 }}
            className="flex-1 space-y-8"
          >
            <h2 className="text-4xl font-bold leading-tight">
              Real-world skills.<br/>
              <span className="text-orange-500">Zero setup required.</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Don't waste hours configuring Docker, Java, and Zookeeper just to learn the basics. Kafka Hub provides a fully configured Apache Kafka 3.7.0 cluster in KRaft mode right in your browser.
            </p>
            <ul className="space-y-4">
              {[
                "Create and Manage Topics",
                "Simulate Producers and Consumers",
                "Investigate Consumer Offsets",
                "Explore Kafka Streams & Connect"
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Activity className="w-4 h-4 text-green-500" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
            <Link href="/workflow" className="inline-block mt-8 text-orange-500 hover:text-orange-400 font-medium flex items-center gap-2 group">
              View the Command Workflow <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div 
            style={{ y: y2 }}
            className="flex-1 w-full"
          >
            <div className="glass-panel p-2 rounded-xl shadow-2xl border border-white/10 overflow-hidden">
              <div className="bg-[#0c0c0c] rounded-lg overflow-hidden">
                <div className="bg-white/5 px-4 py-2 flex items-center gap-2 border-b border-white/10">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  <span className="ml-2 text-xs text-gray-500 font-mono">terminal</span>
                </div>
                <div className="p-6 font-mono text-sm space-y-4">
                  <div className="text-white">
                    <span className="text-orange-500">root@kafkahub:/#</span> kafka-topics.sh --create --topic events
                  </div>
                  <div className="text-gray-400">
                    Created topic events.
                  </div>
                  <div className="text-white">
                    <span className="text-orange-500">root@kafkahub:/#</span> echo "User signed up" | kafka-console-producer.sh --topic events
                  </div>
                  <div className="text-white">
                    <span className="text-orange-500">root@kafkahub:/#</span> kafka-console-consumer.sh --topic events --from-beginning
                  </div>
                  <div className="text-green-400">
                    User signed up
                  </div>
                  <div className="text-orange-500/50 animate-pulse">_</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
