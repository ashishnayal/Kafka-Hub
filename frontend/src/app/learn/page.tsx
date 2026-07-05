"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Book, ChevronRight } from "lucide-react";
import { api, Topic, Lesson } from "@/lib/api";

export default function LearnDashboard() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [lessonsByTopic, setLessonsByTopic] = useState<Record<string, Lesson[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const topicsData = await api.get('/topics').then(res => res.data);
        setTopics(topicsData);
        
        const lessonsMap: Record<string, Lesson[]> = {};
        for (const topic of topicsData) {
          const lessons = await api.get(`/topics/${topic.id}/lessons`).then(res => res.data);
          lessonsMap[topic.id] = lessons;
        }
        setLessonsByTopic(lessonsMap);
      } catch (error) {
        console.error("Failed to load topics", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Course Curriculum</h1>
        <p className="text-gray-400 text-lg">Master Apache Kafka step-by-step.</p>
      </div>

      <div className="space-y-12">
        {topics.map((topic, index) => (
          <motion.div 
            key={topic.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-panel p-8 rounded-2xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-orange-500/20 text-orange-500 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                {index + 1}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{topic.title}</h2>
                <p className="text-gray-400">{topic.description}</p>
              </div>
            </div>

            <div className="grid gap-3">
              {lessonsByTopic[topic.id]?.map((lesson, idx) => (
                <Link key={lesson.id} href={`/learn/${topic.id}/${lesson.id}`}>
                  <div className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <Book className="w-5 h-5 text-gray-500 group-hover:text-orange-400 transition-colors" />
                      <span className="font-medium text-gray-300 group-hover:text-white transition-colors">
                        {idx + 1}. {lesson.title}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                  </div>
                </Link>
              ))}
              {(!lessonsByTopic[topic.id] || lessonsByTopic[topic.id].length === 0) && (
                <p className="text-gray-500 italic pl-4">Coming soon...</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
