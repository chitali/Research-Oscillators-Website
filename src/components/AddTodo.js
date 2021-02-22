import { useState } from 'react';
import styled from '@emotion/styled/macro';
import { useDispatch } from 'react-redux';

import { addTodo } from '../redux/actions';

const AddTodoForm = styled.form`
  margin: 3px;
  button {
    margin-right: 5px;
  }
`;

function AddTodo() {
  const [ text, setText ] = useState("");
  const dispatch = useDispatch();
  return (
    <AddTodoForm onSubmit={(e) => {
      e.preventDefault();
      const addTodoAction = addTodo(text);
      console.log("Added new todo:", addTodoAction);
      dispatch(addTodoAction);
      setText("");
    }}>
      <button>+</button>
      <input value={text} onChange={(e) => setText(e.target.value)} />
    </AddTodoForm>
  );
}

export default AddTodo;
