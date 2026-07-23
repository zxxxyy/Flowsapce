import { differenceInCalendarDays, parseISO, startOfDay } from 'date-fns';
import { Difficulty, Priority } from '../types';

/**
 * Calculates automated priority for university assignments based on:
 * 1. Deadline Proximity:
 *    - ≤ 2 days remaining (or overdue) => High
 *    - ≤ 7 days remaining           => Medium
 *    - > 7 days remaining           => Low
 * 2. Difficulty Adjustment:
 *    - If difficulty is 'hard', priority increases by 1 level (Low -> Medium, Medium -> High).
 */
export function calculatePriority(deadlineISO: string, difficulty: Difficulty): Priority {
  if (!deadlineISO) return 'low';

  const today = startOfDay(new Date());
  const deadlineDate = startOfDay(parseISO(deadlineISO));
  const daysRemaining = differenceInCalendarDays(deadlineDate, today);

  // Step 1: Base Priority by Deadline
  let basePriority: Priority = 'low';
  if (daysRemaining <= 2) {
    basePriority = 'high';
  } else if (daysRemaining <= 7) {
    basePriority = 'medium';
  } else {
    basePriority = 'low';
  }

  // Step 2: Difficulty Adjustment
  if (difficulty === 'hard') {
    if (basePriority === 'low') return 'medium';
    if (basePriority === 'medium') return 'high';
    return 'high';
  }

  return basePriority;
}

/**
 * Utility to sort tasks by urgency (Calculated Priority: High -> Medium -> Low, then by Deadline ascending)
 */
export function getPriorityWeight(priority: Priority): number {
  switch (priority) {
    case 'high':
      return 3;
    case 'medium':
      return 2;
    case 'low':
      return 1;
    default:
      return 0;
  }
}
