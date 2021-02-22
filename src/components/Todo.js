import styled from '@emotion/styled/macro';
import { useDispatch } from 'react-redux';

import { toggleTodo } from '../redux/actions';

const TodoContainer = styled.div`
  margin: 3px;
  text-decoration: ${props => props.completed && 'line-through'};
  button {
    margin-right: 5px;
  }
`;

function Todo({ text, completed, id }) {
  const dispatch = useDispatch();
  return (
    <TodoContainer completed={completed}>
      <button onClick={() => dispatch(toggleTodo(id))}>&#x2714;</button>
      {text}
    </TodoContainer>
  );
}

export default Todo;
