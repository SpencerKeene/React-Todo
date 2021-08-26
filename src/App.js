import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
// Importing components
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {
  // States
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  // Functions
  const getLocalTodos = useCallback(() => {
    let localTodos = JSON.parse(localStorage.getItem("todos"));
    if (localTodos !== null) setTodos(localTodos);
  }, []);

  const saveLocalTodos = useCallback(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const filterHandler = useCallback(() => {
    switch (filter) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => !todo.completed));
        break;
      default:
        setFilteredTodos(todos);
    }
  }, [filter, todos]);

  // Effects
  useEffect(() => getLocalTodos(), [getLocalTodos]);
  useEffect(() => filterHandler(), [filterHandler]);
  useEffect(() => saveLocalTodos(), [saveLocalTodos]);

  return (
    <div className="App">
      <header>
        <h1>Spencer's Todo List</h1>
      </header>
      <Form
        inputText={inputText}
        setInputText={setInputText}
        todos={todos}
        setTodos={setTodos}
        setStatus={setFilter}
      />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        filteredTodos={filteredTodos}
      />
    </div>
  );
}

export default App;
