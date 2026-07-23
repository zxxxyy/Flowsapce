import { Task } from '../types';
import { calculatePriority } from '../utils/priorityCalculator';
import { addDays, subDays, format } from 'date-fns';

const today = new Date();
const formatDate = (date: Date) => format(date, 'yyyy-MM-dd');

export const initialTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Operating Systems Lab 3: Process Synchronization',
    courseName: 'CS 301 - Operating Systems',
    deadline: formatDate(addDays(today, 1)), // Due tomorrow (High Priority)
    difficulty: 'hard',
    status: 'pending',
    calculatedPriority: calculatePriority(formatDate(addDays(today, 1)), 'hard'),
    notes: 'Implement semaphores and mutex locks for producer-consumer problem.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'task-2',
    title: 'Calculus II Problem Set 5 (Integrals)',
    courseName: 'MATH 202 - Calculus II',
    deadline: formatDate(addDays(today, 2)), // Due in 2 days (High Priority)
    difficulty: 'medium',
    status: 'pending',
    calculatedPriority: calculatePriority(formatDate(addDays(today, 2)), 'medium'),
    notes: 'Complete odd-numbered problems from Chapter 7.4.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'task-3',
    title: 'Database Schema Design & ERD Report',
    courseName: 'CS 310 - Database Systems',
    deadline: formatDate(addDays(today, 4)), // Due in 4 days (Medium Priority)
    difficulty: 'hard',
    status: 'pending',
    calculatedPriority: calculatePriority(formatDate(addDays(today, 4)), 'hard'),
    notes: 'Draw ER Diagram for E-commerce schema and normalize to 3NF.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'task-4',
    title: 'Ethics in AI Short Essay (500 words)',
    courseName: 'PHIL 105 - Tech Ethics',
    deadline: formatDate(addDays(today, 6)), // Due in 6 days (Medium Priority)
    difficulty: 'easy',
    status: 'pending',
    calculatedPriority: calculatePriority(formatDate(addDays(today, 6)), 'easy'),
    notes: 'Analyze bias in automated facial recognition algorithms.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'task-5',
    title: 'Algorithms Midterm Revision Notes',
    courseName: 'CS 305 - Algorithms',
    deadline: formatDate(addDays(today, 10)), // Due in 10 days (Low Priority)
    difficulty: 'easy',
    status: 'completed',
    calculatedPriority: calculatePriority(formatDate(addDays(today, 10)), 'easy'),
    notes: 'Summarize Dynamic Programming & Greedy algorithm patterns.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'task-6',
    title: 'Software Engineering Architecture Plan Draft',
    courseName: 'SE 401 - Software Architecture',
    deadline: formatDate(subDays(today, 1)), // Overdue by 1 day (High Priority)
    difficulty: 'medium',
    status: 'pending',
    calculatedPriority: calculatePriority(formatDate(subDays(today, 1)), 'medium'),
    notes: 'Submit high-level architecture diagram and component hierarchy.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
