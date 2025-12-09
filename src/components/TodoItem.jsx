import { useState } from 'react';

function TodoItem({ todo, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editTitle.trim()) {
      onUpdate(todo._id, editTitle.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <li className="todo-item editing">
        <form onSubmit={handleSubmit} className="edit-form">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            autoFocus
            className="edit-input"
          />
          <div className="edit-buttons">
            <button type="submit" className="btn save-btn">저장</button>
            <button type="button" onClick={handleCancel} className="btn cancel-btn">취소</button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li className="todo-item">
      <span className="todo-title">{todo.title}</span>
      <div className="todo-actions">
        <button onClick={() => setIsEditing(true)} className="btn edit-btn">수정</button>
        <button onClick={() => onDelete(todo._id)} className="btn delete-btn">삭제</button>
      </div>
    </li>
  );
}

export default TodoItem;

