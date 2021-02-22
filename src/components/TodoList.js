import React from 'react';
import { useSelector } from 'react-redux';

import Todo from './Todo';
import { getTodos } from '../redux/selectors';

function TodoList() {
  const todos = useSelector(getTodos);
  return (
    <div>
      {todos.map(todo => <Todo key={todo.id} {...todo} />)}
    </div>
  );
}

export default TodoList;
