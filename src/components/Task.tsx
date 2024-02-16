import { Trash } from '@phosphor-icons/react'

import { ITodo } from '../shared/interface/todo';
import styles from './Task.module.css'

interface TaskProps {
  todo: ITodo;
  onHandleCompleteTask: (id: string) => void;
  onHandleDeleteTask: (id: string) => void;
}

export function Task({ todo, onHandleCompleteTask, onHandleDeleteTask }: Readonly<TaskProps>) {

  function handleCompleteTask(): void {
    onHandleCompleteTask(todo.id);
  }

  function handleDeleteTask(): void {
    onHandleDeleteTask(todo.id)
  }

  return (
    <div className={styles.task}>
      <input onChange={handleCompleteTask} type="checkbox" />

      <p className={!todo.completed ? styles.contentEnabled : styles.contentDisabled}>
        {todo.message}
      </p>

      <button onClick={handleDeleteTask} className={styles.delete}>
        <Trash size={20} />
      </button>
    </div>
  );
}
