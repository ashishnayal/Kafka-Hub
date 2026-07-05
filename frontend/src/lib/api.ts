import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const api = axios.create({
    baseURL: API_BASE_URL,
});

export interface Topic {
    id: string;
    title: string;
    description: string;
    order: number;
}

export interface Lesson {
    id: string;
    topicId: string;
    title: string;
    content: string;
    codeExample?: string;
    useCases?: string[];
    order: number;
}

export interface InterviewQuestion {
    id: string;
    question: string;
    answer: string;
    difficulty: string;
    category: string;
}

export const fetchTopics = async (): Promise<Topic[]> => {
    const response = await api.get('/topics');
    return response.data;
};

export const fetchLessonsForTopic = async (topicId: string): Promise<Lesson[]> => {
    const response = await api.get(`/topics/${topicId}/lessons`);
    return response.data;
};

export const fetchLessonDetails = async (lessonId: string): Promise<Lesson> => {
    const response = await api.get(`/topics/lessons/${lessonId}`);
    return response.data;
};

export const fetchInterviewQuestions = async (difficulty?: string, category?: string): Promise<InterviewQuestion[]> => {
    let url = '/interview-questions';
    const params = new URLSearchParams();
    if (difficulty) params.append('difficulty', difficulty);
    if (category) params.append('category', category);
    
    if (params.toString()) {
        url += `?${params.toString()}`;
    }
    
    const response = await api.get(url);
    return response.data;
};
