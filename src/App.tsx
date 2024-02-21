import { ChangeEvent, FormEvent, useState } from 'react';
import { Task } from './components/Task'
import { Header } from './components/Header'
import { Empty } from './shared/components/Empty';
import { Tag } from './shared/components/Tag';

import { PlusCircle } from '@phosphor-icons/react'

import uuid from 'react-uuid';

import styles from './App.module.css'
import { ITodo } from './shared/interface/todo';

import './global.css';

function App() {
  const [todo, setTodo] = useState<ITodo[]>([]);
  const [todoMessage, setTodoMessage] = useState<string>('');
  const numberOfTasksCompleteds = todo.filter((todo: ITodo) => todo.completed).length;

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
      <Header/>

      <form onSubmit={handleCreateTodo}>
        <div className={styles.todoWrapper}>
          <div className={styles.inputWrapper}>
            <input onChange={handleInputChange} value={todoMessage} type="text" placeholder='Adicione uma nova tarefa' name="todoMessage" id="todoMessage"/>
            <button type='submit'>
            Criar
            <PlusCircle size={16} weight="bold"/>
            </button>
          </div>
          
          <div className={styles.todoStatus}>
            <Tag label='Tarefas criadas' labelColor='#4EA8DE' startRange={todo.length}/>
            <Tag label='Tarefas concluídas' labelColor='#8284FA' startRange={numberOfTasksCompleteds} endRange={todo.length}/>
          </div>
          
            {todo.length 
            ? 
            <div className={styles.tasksContainer}>
              <ul className={styles.tasksItem}>
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
            : 
            <div className={styles.empty}>
              <Empty/>
            </div>
            }
        </div>
      </form>
    
    </div>
  )
}

export default App
