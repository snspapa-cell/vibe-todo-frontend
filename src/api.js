const API_BASE = import.meta.env.VITE_API_BASE_URL;

// 할일 전체 조회
export async function fetchTodos() {
  const res = await fetch(API_BASE);
  const data = await res.json();
  if (!data.success) throw new Error(data.message);
  return data.data;
}

// 할일 생성
export async function createTodo(title) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message);
  return data.data;
}

// 할일 수정
export async function updateTodo(id, title) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message);
  return data.data;
}

// 할일 삭제
export async function deleteTodo(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message);
  return true;
}

