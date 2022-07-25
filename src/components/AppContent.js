import React from 'react';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';

// Render todo list on screen

function AppContent() {
  // Get todoList from redux with useSelector hook; state.todo is the name from todoSlice sliceCreator function
  const todoList = useSelector((state) => state.todo.todoList);
  // console.log(todoList);

  const sortedTodoList = [...todoList];
  // Sort based on time
  sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time));

  return (
    <div>
      {sortedTodoList && sortedTodoList.length > 0
        ? // Pass todo props to todoItem component to render
          sortedTodoList.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        : 'No Todo found '}
    </div>
  );
}

export default AppContent;
