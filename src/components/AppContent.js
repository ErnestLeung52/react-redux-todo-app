import React from 'react';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';
import styles from '../styles/modules/app.module.scss';

// Render todo list on screen

function AppContent() {
  // Get todoList from redux with useSelector hook; state.todo is the name from todoSlice sliceCreator function
  const todoList = useSelector((state) => state.todo.todoList);
  // console.log(todoList);

  const filterStatus = useSelector((state) => state.todo.filterStatus);

  // Sort based on time
  const sortedTodoList = [...todoList];
  sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time));

  // Filter status from sortedTodoList
  const filteredTodoList = sortedTodoList.filter((item) => {
    if (filterStatus === 'all') {
      return true;
    }
    return item.status === filterStatus;
  });

  return (
    <div className={styles.content__wrapper}>
      {/* {sortedTodoList && sortedTodoList.length > 0
        ? // Pass todo props to todoItem component to render
          sortedTodoList.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        : 'No Todo found '} */}
      {filteredTodoList && filteredTodoList.length > 0
        ? filteredTodoList.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        : 'No Todo found '}
    </div>
  );
}

export default AppContent;
