import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewTodo,
  deleteTodo,
  toggleTodo,
  editTodo,
} from "./Redux/todoSlice";
import "./index.css";

function ToDoList() {
  const [task, setTask] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [filtered, setFiltered] = useState("all");
  const tasks = useSelector((state) => state.todoData.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      savedTasks.forEach((task) => {
        dispatch(addNewTodo(task.text, task.completed));
      });
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (task.trim()) {
      if (editTaskId) {
        dispatch(editTodo({ id: editTaskId, text: task }));
        setEditTaskId(null);
      } else {
        dispatch(addNewTodo(task));
      }
      setTask("");
    }
  };

  const handleEditTask = (id, text) => {
    setTask(text);
    setEditTaskId(id);
  };

  const handleToggleComplete = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleFilterChange = (filter) => {
    setFiltered(filter);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filtered === "completed") return task.completed;
    if (filtered === "pending") return !task.completed;
    return true;
  });

  return (
    <main className="container">
      <section className="todo-section">
        <div className="todo-container">
          <h1 className="todo-title">QuickList</h1>
          <div className="todo-input-container">
            <input
              type="text"
              className="todo-input"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Add a new task"
            />
            <button className="todo-button" onClick={handleAddTask}>
              {editTaskId ? "Edit Task" : "Add Task"}
            </button>
          </div>

          <div className="filter-container">
            <button onClick={() => handleFilterChange("all")}>All</button>
            <button onClick={() => handleFilterChange("pending")}>
              Pending
            </button>
            <button onClick={() => handleFilterChange("completed")}>
              Completed
            </button>
          </div>

          <ul className="todo-list">
            {filteredTasks.map((t) => (
              <li className="todo-item" key={t.id}>
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => handleToggleComplete(t.id)}
                />
                <span
                  className={`todo-text ${t.completed ? "completed" : ""}`}
                  onClick={() => handleEditTask(t.id, t.text)}
                >
                  {t.text}
                </span>
                <button
                  className="todo-delete"
                  onClick={() => handleDeleteTask(t.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <p className="task-count">
            {tasks.filter((task) => !task.completed).length} tasks remaining
          </p>
        </div>
      </section>
    </main>
  );
}

export default ToDoList;
