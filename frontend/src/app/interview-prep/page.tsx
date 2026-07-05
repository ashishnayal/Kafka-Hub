"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, BrainCircuit } from "lucide-react";
import { api, InterviewQuestion } from "@/lib/api";

export default function InterviewPrep() {
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await api.get('/interview-questions').then(res => res.data);
        setQuestions(data);
      } catch (error) {
        console.error("Failed to load questions", error);
      } finally {
        setLoading(false);
      }
    };
    loadQuestions();
  }, []);

  const filteredQuestions = filter === "All" ? questions : questions.filter(q => q.difficulty === filter);

  const toggleQuestion = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  const difficultyColor = (diff: string) => {
    switch(diff.toLowerCase()) {
      case 'easy': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'hard': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 pb-24">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-4 bg-orange-500/10 rounded-full mb-6">
          <BrainCircuit className="w-10 h-10 text-orange-500" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Interview Preparation</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Test your knowledge with frequently asked Kafka interview questions. Click on a question to reveal the answer.
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-10">
        {["All", "Easy", "Medium", "Hard"].map(level => (
          <button
            key={level}
            onClick={() => setFilter(level)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              filter === level 
                ? 'bg-white text-black' 
                : 'glass-panel text-gray-400 hover:text-white'
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredQuestions.map((q) => (
          <motion.div 
            key={q.id}
            layout
            className="glass-panel rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-colors"
          >
            <button 
              className="w-full text-left p-6 flex items-center justify-between focus:outline-none"
              onClick={() => toggleQuestion(q.id)}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-md border ${difficultyColor(q.difficulty)}`}>
                    {q.difficulty}
                  </span>
                  <span className="text-xs text-gray-500 font-mono tracking-wider uppercase">
                    {q.category}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-white pr-8">{q.question}</h3>
              </div>
              {activeId === q.id ? <ChevronUp className="text-gray-400 flex-shrink-0" /> : <ChevronDown className="text-gray-400 flex-shrink-0" />}
            </button>
            
            <AnimatePresence>
              {activeId === q.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-6 pt-0 border-t border-white/5 bg-white/[0.02]">
                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{q.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
        {filteredQuestions.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            No questions found for the selected difficulty.
          </div>
        )}
      </div>
    </div>
  );
}
