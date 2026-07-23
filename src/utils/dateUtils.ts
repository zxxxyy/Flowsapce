import { format, parseISO, differenceInCalendarDays, startOfDay, isPast, isToday, isTomorrow } from 'date-fns';

export function getDaysRemaining(deadlineISO: string): number {
  if (!deadlineISO) return 0;
  const today = startOfDay(new Date());
  const deadline = startOfDay(parseISO(deadlineISO));
  return differenceInCalendarDays(deadline, today);
}

export function isTaskOverdue(deadlineISO: string, status: string): boolean {
  if (status === 'completed' || !deadlineISO) return false;
  const today = startOfDay(new Date());
  const deadline = startOfDay(parseISO(deadlineISO));
  return deadline < today;
}

export function formatDeadlineRelative(deadlineISO: string): string {
  if (!deadlineISO) return 'No deadline';
  const deadlineDate = parseISO(deadlineISO);

  if (isToday(deadlineDate)) {
    return 'Due Today';
  }
  if (isTomorrow(deadlineDate)) {
    return 'Due Tomorrow';
  }

  const days = getDaysRemaining(deadlineISO);
  if (days < 0) {
    const absDays = Math.abs(days);
    return `Overdue by ${absDays} day${absDays > 1 ? 's' : ''}`;
  }
  if (days <= 7) {
    return `Due in ${days} days`;
  }

  return format(deadlineDate, 'MMM d, yyyy');
}

export function formatDateStandard(deadlineISO: string): string {
  if (!deadlineISO) return '-';
  return format(parseISO(deadlineISO), 'MMM d, yyyy');
}
