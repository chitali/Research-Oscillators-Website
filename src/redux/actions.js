export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';

/*
 * ADD_TODO action
 * {
 *   type: ADD_TODO,
 *   text: "Finish todo app"
 * }
 */
 export function addTodo(text) {
   return { type: ADD_TODO, text };
 }


 /*
  * TOGGLE_TODO action
  * {
  *   type: TOGGLE_TODO,
  *   id: 3
  * }
  */
  export function toggleTodo(id) {
    return { type: TOGGLE_TODO, id };
  }
