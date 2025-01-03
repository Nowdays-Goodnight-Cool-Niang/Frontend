import { create } from 'zustand';
import { ITodoItem } from '../type/todo';

interface ITodoState {
  todos: ITodoItem[];
  completeTodos: ITodoItem[];
  remainingTodos: ITodoItem[];
  addTodo: (todo: ITodoItem) => void;
  deleteTodo: (id: number) => void;
}

const initialTodos: ITodoItem[] = [
  { id: 1, content: '샤워하기', isDone: true },
  { id: 2, content: '빼빼로 먹기', isDone: false },
  { id: 3, content: '빼빼로 먹기', isDone: false },
];

export const useTodoStore = create<ITodoState>((set) => {
  const completeTodos = initialTodos.filter((todo) => todo.isDone);
  const remainingTodos = initialTodos.filter((todo) => !todo.isDone);

  return {
    todos: initialTodos,
    completeTodos,
    remainingTodos,
    addTodo: (todo: ITodoItem) =>
      set((state) => {
        const newTodos = [...state.todos, todo];
        return {
          todos: newTodos,
          completeTodos: newTodos.filter((todo) => todo.isDone),
          remainingTodos: newTodos.filter((todo) => !todo.isDone),
        };
      }),
    deleteTodo: (id: number) =>
      set((state) => {
        const newTodos = state.todos.filter((todo: ITodoItem) => todo.id !== id);
        return {
          todos: newTodos,
          completeTodos: newTodos.filter((todo) => todo.isDone),
          remainingTodos: newTodos.filter((todo) => !todo.isDone),
        };
      }),
  };
});
