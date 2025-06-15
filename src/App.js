import React, { useState } from 'react';
import TodoItem from './TodoItem';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const addTodo = () => {
    if (input.trim() === '') return;
    setTodos([...todos, { text: input, completed: false }]);
    setInput('');
  };

  const toggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const clearTodos = () => setTodos([]);

  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  const pending = total - completed;

  const pendingTodos = todos.filter(t => !t.completed);
  const completedTodos = todos.filter(t => t.completed);

  return (
    <div className={`container ${darkMode ? 'dark' : ''}`}>
      <div className="app">
        <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
        <h1>📝 Todo Lists</h1>

        <div className="input-container">
          <input
            type="text"
            placeholder="Enter a task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={addTodo}>Add</button>
        </div>

        <div className="todo-list">
          {todos.length === 0 ? (
            <p>No tasks yet. Add some!</p>
          ) : (
            todos.map((todo, index) => (
              <TodoItem
                key={index}
                todo={todo}
                index={index}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
              />
            ))
          )}
        </div>

        <div className="progress-section">
          <h2>📊 Task Summary</h2>

          <table className="task-table">
            <thead><tr><th>All Tasks ({total})</th></tr></thead>
            <tbody>
              {todos.map((t, i) => (
                <tr key={i}>
                  <td className={t.completed ? 'completed' : ''}>{t.text}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <table className="task-table">
            <thead><tr><th>⏳ Pending ({pending})</th></tr></thead>
            <tbody>
              {pendingTodos.map((t, i) => (
                <tr key={i}>
                  <td>{t.text}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <table className="task-table">
            <thead><tr><th>✅ Completed ({completed})</th></tr></thead>
            <tbody>
              {completedTodos.map((t, i) => (
                <tr key={i}>
                  <td className="completed">{t.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {todos.length > 0 && (
          <button className="clear-btn" onClick={clearTodos}>Clear All</button>
        )}
      </div>
    </div>
  );
};

export default App;
