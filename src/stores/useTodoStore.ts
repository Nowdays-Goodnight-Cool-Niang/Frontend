import { create } from 'zustand';
import { ITodoItem } from '../type/todo';

export const useTodoStore = create((set) => ({
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
