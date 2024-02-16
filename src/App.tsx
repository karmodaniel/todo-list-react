import { ChangeEvent, FormEvent, useState } from 'react';
import { Task } from './components/Task'

import uuid from 'react-uuid';

import todoLogo from './assets/logo.svg'
import styles from './App.module.css'
import { ITodo } from './shared/interface/todo';

import './global.css';

function App() {
  const [todo, setTodo] = useState<ITodo[]>([]);
  const [todoMessage, setTodoMessage] = useState<string>('');

  function handleCreateTodo(event: FormEvent): void {
    event.preventDefault();

    const newTodo = {
      id: uuid(),
      completed: false,
      message: todoMessage
    }

    if (todoMessage) {
      setTodo([...todo, newTodo]);
      setTodoMessage('');
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setTodoMessage(event.target.value); 
  }

  function getNumberOfTasksCompleteds(): number {
    return todo.filter((todo: ITodo) => todo.completed).length
  }

  function handleCompleteTask(id: string): void {
    const updatedTodos = todo.map((item => {
      if (item.id === id) {
        item.completed = !item.completed;
      } 
      
      return item;
    }))

    setTodo(updatedTodos);
  }

  function handleDeleteTask(id: string) : void {
    const todosWithoutDeletedOne = todo.filter((item) => item.id !== id);

    setTodo(todosWithoutDeletedOne);
  }

  return (
    <div className={styles.todo}>
      <header>
        <img src={todoLogo} alt="Logo todo" />
      </header>

      <form onSubmit={handleCreateTodo}>
        <div className={styles.todoWrapper}>
          <div className={styles.inputWrapper}>
            <input onChange={handleInputChange} value={todoMessage} type="text" placeholder='Adicione uma nova tarefa' name="todoMessage" id="todoMessage"/>
            <button type='submit'>Criar</button>
          </div>
          
          <div className={styles.todoStatus}>
            <span>Tarefas criadas {todo.length}</span>
            <span>Tarefas concluídas {getNumberOfTasksCompleteds()} de {todo.length}</span>
          </div>
          
            <ul className={styles.container}>
              {
                todo.map((todo: ITodo) => {
                  return (
                    <li key={todo.id}>
                      <Task todo={todo} onHandleCompleteTask={handleCompleteTask} onHandleDeleteTask={handleDeleteTask}/>
                    </li>
                  ) 
                })
              }
            </ul>
        </div>
      </form>
    
    </div>
  )
}

export default App
