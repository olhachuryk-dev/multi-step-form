export interface IStep {
  id: string;
  title?: string;
  description?: string;
  name?: string;
  order: number;
  completed: boolean;
}
