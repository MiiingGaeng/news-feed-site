import { useEffect, useState } from "react";
import api from "./axios/api"
import { userBearsStore } from "./zustand/bearStore";

const App = () => {
  const [todo, setTodo] = useState({
    title: "",
  });
  const [todos, setTodos] = useState(null);

  // patch에서 사용할 id, 수정값의 state를 추가
  const [targetId, setTargetId] = useState(null);
  const [editTodo, setEditTodo] = useState({
    title: "",
  });

  const fetchTodos = async () => {
    const { data } = await api.get("/todos");
    setTodos(data);
  };

  const onSubmitHandler = async(todo) => {
    const {data} = await api.post("/todos", todo);
    setTodos(todo => [...todo, data])
  };

  const onClickDeleteButtonHandler = async(todoId) => {
    const {data} = await api.delete(`/todos/${todoId}`);
    setTodos(todos.filter(e => e.id !== data.id))
  };

  // 수정버튼 이벤트 핸들러 추가 👇
  const onClickEditButtonHandler = async(todoId, edit) => {
    const {data} = await api.patch(`/todos/${todoId}`, edit);
    setTodos(todos.map(e => e.id === data.id ? {...e, content: data.content} : e))
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // zustand
  const {bears, increase, init} = userBearsStore((state) => {
    return state
  })

  return (
    <>
      <div>
        <h4>Zustand</h4>
        <p>{bears}</p>
        <button onClick={increase}>+1</button>
        <button onClick={init}>초기화</button>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitHandler(todo);
        }}
      >
        {/* 👇 수정기능에 필요한 id, 수정값 input2개와 수정하기 버튼을 추가 */}
        <div>
          <input
            type="text"
            placeholder="수정하고싶은 Todo ID"
            onChange={(ev) => {
              setTargetId(ev.target.value);
            }}
          />
          <input
            type="text"
            placeholder="수정값 입력"
            onChange={(ev) => {
              setEditTodo({
                ...editTodo,
                title: ev.target.value,
              });
            }}
          />
          <button
						// type='button' 을 추가해야 form의 영향에서 벗어남
            type="button"
            onClick={() => onClickEditButtonHandler(targetId, editTodo)}
          >
            수정하기
          </button>
        </div>
        <input
          type="text"
          onChange={(ev) => {
            const { value } = ev.target;
            setTodo({
              ...todo,
              title: value,
            });
          }}
        />
        <button>추가하기</button>
      </form>
      <div>
        {todos?.map((todo) => (
          <div key={todo.id}>
						{/* todo의 아이디를 화면에 표시 */}
            {todo.id} :{todo.title}
            <button
              type="button"
              onClick={() => onClickDeleteButtonHandler(todo.id)}
            >
              삭제하기
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;