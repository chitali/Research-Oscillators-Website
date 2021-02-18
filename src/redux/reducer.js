import { ADD_TODO, TOGGLE_TODO } from './actions';

let currId = 0;
function todosReducer(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        {
          text: action.text,
          completed: false,
          id: ++currId
        },
        ...state
      ];
    case TOGGLE_TODO:
      return state.map(todo => (
        todo.id === action.id ? {
          ...todo,
          completed: !todo.completed
        } : todo
      ));
    default:
      return state;
  }
}
