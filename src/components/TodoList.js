import React from 'react';

import Todo from './Todo';

function TodoList({ todos }) {
  return (
    <div>
      {todos.map(todo => <Todo key={todo.id} {...todo} />)}
    </div>
  )
}

export default TodoList;
