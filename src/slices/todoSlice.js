import { createSlice } from '@reduxjs/toolkit';

const getInitialTodos = () => {
  // Get data from local storage
  const localTodoList = window.localStorage.getItem('todoList');

  if (localTodoList) {
    return JSON.parse(localTodoList);
  }
  // If todoList not found in local storage
  window.localStorage.setItem('todoList', JSON.stringify([]));
  return [];
};

const initialValue = {
  todoList: getInitialTodos(),
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState: initialValue,
  reducers: {
    addTodo: (state, action) => {
      state.todoList.push(action.payload);
      // Get todoList from local storage
      const todoList = window.localStorage.getItem('todoList');

      //   console.log('TodoSlice', action.payload);

      if (todoList) {
        const todoListArr = JSON.parse(todoList);

        // Push new todo into todolist arr
        todoListArr.push({
          ...action.payload,
        });

        window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
      } else {
        // Setting new Todo
        window.localStorage.setItem(
          'todoList',
          JSON.stringify([{ ...action.payload }])
        );
      }
    },
  },
});

export const { addTodo } = todoSlice.actions;
export default todoSlice.reducer;
