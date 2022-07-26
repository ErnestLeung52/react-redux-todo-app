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
  // reducers: it's an object where the keys will become action type strings, and the functions are reducers that will be run when that action type is dispatched.
  reducers: {
    addTodo: (state, action) => {
      // update the state
      state.todoList.push(action.payload);
      // Get todoList from local storage
      const todoList = window.localStorage.getItem('todoList');

      //   console.log('TodoSlice', action.payload);
      //   console.log('TodoSlice', action);
      //   console.log('TodoSlice', state.todoList);

      // Make a copy of the original todoList from local storage, and add new data to it, then upload the new todoList to local storage
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
    deleteTodo: (state, action) => {
      const todoList = window.localStorage.getItem('todoList');

      if (todoList) {
        const todoListArr = JSON.parse(todoList);

        todoListArr.forEach((todo, index) => {
          if (todo.id === action.payload) {
            todoListArr.splice(index, 1);
          }
        });
        // Update local storage
        window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
        // Update redux state
        state.todoList = todoListArr;
      }
    },
    updateTodo: (state, action) => {
      const todoList = window.localStorage.getItem('todoList');

      if (todoList) {
        const todoListArr = JSON.parse(todoList);

        todoListArr.forEach((todo) => {
          if (todo.id === action.payload.id) {
            todo.title = action.payload.title;
            todo.status = action.payload.status;
          }
        });

        window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
        state.todoList = todoListArr;
      }
    },
  },
});

export const { addTodo, deleteTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
