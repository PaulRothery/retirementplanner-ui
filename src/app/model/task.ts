export class Task {
  id: number | null;
  name: String | null;
  comments: String | null;
  lastCompletedDate: Date | null;
  expirationDate: Date | null;
  targetDate: Date | null;
  repeatCycle: number;
  creationDate: Date | null;
  completed: boolean;

  constructor(task: Partial<Task> = {}) {
    this.id = task?.id || null;
    this.name = task?.name || null;
    this.comments = task?.comments || null;
    this.lastCompletedDate = task?.lastCompletedDate || null;
    this.expirationDate = task?.expirationDate || null;
    this.targetDate = task?.targetDate || null;
    this.repeatCycle = task?.repeatCycle || 0;
    this.creationDate = task?.creationDate || null;
    this.completed = task?.completed || false;

  }
}