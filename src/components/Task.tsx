import { Trash, Check } from '@phosphor-icons/react'

import { ITodo } from '../shared/interface/todo';
import styles from './Task.module.css'

interface TaskProps {
  todo: ITodo;
  onHandleCompleteTask: (id: string) => void;
  onHandleDeleteTask: (id: string) => void;
}

export function Task({ todo, onHandleCompleteTask, onHandleDeleteTask }: Readonly<TaskProps>) {

  const checkboxToggleStyle = todo.completed ? styles.checkboxChecked : styles.checkboxUnchecked;
  const paragraphToggleStyle = !todo.completed ? styles.contentEnabled : styles.contentDisabled;
  const checkBoxId = `checkbox${todo.id}`;

  function handleCompleteTask(): void {
    onHandleCompleteTask(todo.id);
  }

  function handleDeleteTask(): void {
    onHandleDeleteTask(todo.id)
  }

  return (
    <div className={styles.task}>
      <input onChange={handleCompleteTask} checked={todo.completed} type="checkbox" id={checkBoxId} />
      <label htmlFor={checkBoxId} className={`${styles.checkbox} ${checkboxToggleStyle}`}>
        { todo.completed && <Check size={12} />}
      </label>

      <div className={styles.paragraphWrapper}>
        <p className={paragraphToggleStyle}>
          {todo.message}
        </p>
      </div>
      
      <button onClick={handleDeleteTask} className={styles.delete}>
        <Trash size={16} />
      </button>
    </div>
  );
}
