import { create } from 'zustand';
import { ITodoItem } from '../type/todo';

interface ITodoState {
  todos: ITodoItem[];
  addTodo: (todo: ITodoItem) => void;
  deleteTodo: (id: number) => void;
}

export const useTodoStore = create<ITodoState>((set) => ({
  todos: [
    { id: 1, content: '함', isDone: true },
    { id: 2, content: '아직 안함', isDone: false },
  ],
  addTodo: (todo: ITodoItem) => set((state) => ({ todos: [...state.todos, todo] })),
  deleteTodo: (id: number) =>
    set((state) => ({
      todos: state.todos.filter((todo: ITodoItem) => todo.id !== id),
    })),
}));
