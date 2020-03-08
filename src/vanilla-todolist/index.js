import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DEL_TODO = "DELETE_TODO";

const addTodo = text => {
  return {
    type: ADD_TODO,
    text
  };
};

const deleteTodo = id => {
  return {
    type: DEL_TODO,
    id
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [{ text: action.text, id: Date.now() }, ...state];
    case DEL_TODO:
      return state.filter(toDo => toDo.id !== action.id);
    default:
      return state;
  }
};
const store = createStore(reducer);
store.subscribe(() => console.log(store.getState()));

const dispatchAddToDo = text => {
  store.dispatch(addTodo(text));
};

const dispatchDeleteToDo = e => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteTodo(id));
};

const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach(toDo => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.innerText = "DEL";
    button.addEventListener("click", dispatchDeleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(button);
    ul.appendChild(li);
  });
};
store.subscribe(paintToDos);

const onSubmit = e => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);
