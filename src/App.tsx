import './global.scss'
import './app.scss'

import logo from './assets/Logo.svg'
import clipboard from './assets/Clipboard.svg'
import plus from './assets/plus.svg'
import trash from './assets/trash.svg'

import { useState } from 'react'

import { Task } from './utils'
import capitalizeFirstLetter from './utils'



export const App = () => {
  const [loading, setLoading] = useState(true)
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [taskCount, setTaskCount] = useState(0)
  const [taskCompleted, setTaskCompleted] = useState(0)

  const newTask: Task = {
    id: Math.random(),
    title: newTaskTitle,
    isComplete: false
  }

  function handleCreateNewTask() {
    if (!newTaskTitle) return
    setTasks([...tasks, newTask]);
    setNewTaskTitle('')
    setLoading(false);
    setTaskCount(taskCount + 1)
  }

  function keyPressCreateNewTask(event: any){
    if(event.key === 'Enter') {
      handleCreateNewTask()
    }
  }

  function handleDeleteTask(id:number) {
    const remainingTask = tasks.filter((task) => task.id !== id)
    setTasks(remainingTask)
    setTaskCount(taskCount - 1)
    
    const taskIndex = tasks.findIndex((task) => task.id == id)
    const temporaryTasks = [...tasks]
    if(temporaryTasks[taskIndex].isComplete === true){
      setTaskCompleted(taskCompleted - 1)
    }

  }


  function handleToggleTaskComplete(id:number){
    const taskIndex = tasks.findIndex((task) => task.id == id)

    const temporaryTasks = [...tasks]
    temporaryTasks[taskIndex].isComplete = !temporaryTasks[taskIndex].isComplete
    setTasks(temporaryTasks)
    if(temporaryTasks[taskIndex].isComplete === true){
      setTaskCompleted(taskCompleted + 1)
    } else {
      setTaskCompleted(taskCompleted - 1)
    }
  }


  return (
    <div className='wrapper'>
      <header className='header'>
        <img src={logo} alt="" />
      </header>
      <div className="inputButton">
        <input type="text" placeholder='Adicione uma nova tarefa' onKeyDown={keyPressCreateNewTask} onChange={(e) => setNewTaskTitle(e.target.value)} value={newTaskTitle} />
        <button type='submit' onClick={handleCreateNewTask}>
          Criar
          <img src={plus} alt="" />
        </button>
      </div>

      <div className="spans">
        <div className="span-created">
          <span>Tarefas criadas</span>
          <span>{taskCount}</span>
        </div>
        <div className="span-finished">
          <span>Concluídas</span>
          <span>{taskCompleted} de {taskCount}</span>
        </div>
      </div>

      <div className="tasks">
        {loading ? (
          <div className="falseContainer">
            <img src={clipboard} className='clipboard' alt="" />
            <h2>Você ainda não tem tarefas cadastradas</h2>
            <h3>Crie tarefas e organize seus ítens a fazer</h3>
          </div>
        ) : (
          <>
            {tasks.map((task) => (
              <div key={task.id} className="task">
                <div className={task.isComplete ? 'completed': ''} style={{ display: 'flex', gap: '1rem' }}>
                  <input type="checkbox" checked={task.isComplete}  onClick={() => handleToggleTaskComplete(task.id)}/>
                  <p>{capitalizeFirstLetter(task.title)}</p>
                </div>
                <a type='button'> <img src={trash} onClick={() => handleDeleteTask(task.id)} /></a>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}
