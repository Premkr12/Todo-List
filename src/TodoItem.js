import React from 'react';

const TodoItem = ({ todo, index, toggleComplete, deleteTodo }) => {
  const checkboxId = `todo-checkbox-${index}`;

  return (
    <div className="todo-item">
      <label htmlFor={checkboxId} className="todo-label">
        <input
          id={checkboxId}
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(index)}
        />
        <span className={todo.completed ? 'completed' : ''}>
          {todo.text}
        </span>
      </label>
      <button className="delete-btn" onClick={() => deleteTodo(index)}>❌</button>
    </div>
  );
};

export default TodoItem;
