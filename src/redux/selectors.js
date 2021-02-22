import { VisibilityFilters } from './actions';

export function getTodos(state) {
  return state.todos;
}

export function getTodosByActiveFilter(state) {
  const todos = getTodos(state);
  const activeFilter = getVisibilityFilter(state);
  switch (activeFilter) {
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed);
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed);
    case VisibilityFilters.SHOW_ALL:
    default:
      return todos;
  }
}

export function getVisibilityFilter(state) {
  return state.visibilityFilter;
}
