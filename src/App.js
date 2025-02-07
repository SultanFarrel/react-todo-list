import { useState } from "react";

const initialTodos = [
  { id: 1, task: "Learn React", completed: false },
  { id: 2, task: "Build a Todo App", completed: false },
  { id: 3, task: "Build with ReactJS", completed: false },
];

export default function App() {
  const [todos, setTodos] = useState(initialTodos);

  function handleAddTodo(todo) {
    setTodos((todos) => [...todos, todo]);
  }

  function handleDeleteTodo(id) {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }

  function handleToggleCompleted(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  return (
    <div className="container mx-auto p-4 m-4 border max-w-xs rounded-2xl shadow-md h-96 flex flex-col">
      <h1 className="text-3xl font-bold">Today</h1>
      <Todo
        todos={todos}
        onDeleteTodo={handleDeleteTodo}
        onToggleCompleted={handleToggleCompleted}
      />
      <AddTodo onAddTodo={handleAddTodo} />
    </div>
  );
}

function Todo({ todos, onDeleteTodo, onToggleCompleted }) {
  return (
    <div className="form-control overflow-y-auto flex-grow scrollbar-hide">
      <ul>
        {todos.map((todo) => (
          <li
            className="border rounded-2xl my-4 ps-2 flex justify-between items-center"
            key={todo.id}
          >
            <label className="label cursor-pointer justify-start flex-grow">
              <input
                type="checkbox"
                className="checkbox"
                value={todo.completed}
                onChange={() => onToggleCompleted(todo.id)}
              />
              <span
                className="label-text mx-2"
                style={todo.completed ? { textDecoration: "line-through" } : {}}
              >
                {todo.task}
              </span>
            </label>
            <button className="pe-2" onClick={() => onDeleteTodo(todo.id)}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AddTodo({ onAddTodo }) {
  const [task, setTask] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!task) return;

    const id = crypto.randomUUID();
    const newTodo = {
      id,
      task,
      completed: false,
    };

    onAddTodo(newTodo);

    setTask("");
  }

  return (
    <form
      className="form-control mt-4 sticky bottom-0 bg-white"
      onSubmit={handleSubmit}
    >
      <div className="flex">
        <input
          type="text"
          className="input input-sm input-bordered flex-grow"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button className="btn btn-sm btn-primary ms-2">Add</button>
      </div>
    </form>
  );
}
