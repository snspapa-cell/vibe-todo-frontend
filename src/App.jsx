import { useState, useEffect } from 'react';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from './api';
import TodoItem from './components/TodoItem';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 할일 목록 불러오기
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await fetchTodos();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError('할일 목록을 불러오는데 실패했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 할일 추가
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      const todo = await createTodo(newTitle.trim());
      setTodos([todo, ...todos]);
      setNewTitle('');
    } catch (err) {
      setError('할일 추가에 실패했습니다.');
      console.error(err);
    }
  };

  // 할일 수정
  const handleUpdate = async (id, title) => {
    try {
      const updated = await updateTodo(id, title);
      setTodos(todos.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      setError('할일 수정에 실패했습니다.');
      console.error(err);
    }
  };

  // 할일 삭제
  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((t) => t._id !== id));
    } catch (err) {
      setError('할일 삭제에 실패했습니다.');
      console.error(err);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>📝 할일 목록</h1>
      </header>

      <form onSubmit={handleAdd} className="add-form">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="새로운 할일을 입력하세요..."
          className="add-input"
        />
        <button type="submit" className="btn add-btn">추가</button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">불러오는 중...</div>
      ) : todos.length === 0 ? (
        <div className="empty-state">
          <p>등록된 할일이 없습니다.</p>
          <p>새로운 할일을 추가해보세요!</p>
        </div>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}

      <footer className="footer">
        <span>총 {todos.length}개의 할일</span>
      </footer>
    </div>
  );
}

export default App;
