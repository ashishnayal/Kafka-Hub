"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Terminal, CheckCircle2 } from "lucide-react";
import { api, Lesson } from "@/lib/api";

export default function LessonDetail() {
  const params = useParams();
  const router = useRouter();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLesson = async () => {
      try {
        const data = await api.get(`/topics/lessons/${params.lessonId}`).then(res => res.data);
        setLesson(data);
      } catch (error) {
        console.error("Failed to load lesson", error);
      } finally {
        setLoading(false);
      }
    };
    if (params.lessonId) loadLesson();
  }, [params.lessonId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!lesson) {
    return <div className="text-center mt-20 text-xl">Lesson not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 pb-24">
      <button 
        onClick={() => router.push('/learn')}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Curriculum
      </button>

      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white">{lesson.title}</h1>
      
      <div className="prose prose-invert max-w-none mb-12">
        <p className="text-lg text-gray-300 leading-relaxed whitespace-pre-wrap">
          {lesson.content}
        </p>
      </div>

      {lesson.useCases && lesson.useCases.length > 0 && (
        <div className="mb-12 glass-panel p-8 rounded-2xl border-l-4 border-l-orange-500">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <CheckCircle2 className="text-orange-500" /> When to use this?
          </h3>
          <ul className="space-y-3">
            {lesson.useCases.map((useCase, idx) => (
              <li key={idx} className="text-gray-300 flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span> {useCase}
              </li>
            ))}
          </ul>
        </div>
      )}

      {lesson.codeExample && (
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Terminal className="text-blue-400" /> Example Code
          </h3>
          <div className="bg-[#1e1e1e] rounded-xl p-6 overflow-x-auto border border-white/10 shadow-2xl">
            <pre className="text-sm font-mono text-gray-300">
              <code>{lesson.codeExample}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
