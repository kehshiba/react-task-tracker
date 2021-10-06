import { useState , useEffect } from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";


const App=() => {
  const [ShowAddBtn , setShowAddBtn] = useState(false)
  const[tasks, setTasks] = useState([])
  useEffect(() => {
   const getTasks = async () => {
     const tasksFromServer = await fetchTasks()
     setTasks(tasksFromServer)
   }
    getTasks()
  }, [])
  //fetching
  const fetchTasks = async () =>
  {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }
//fe
const fetchTask = async (id) =>
  {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }

//add
const addTask = async(task) => {
  const res = await fetch('http://localhost:5000/tasks', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(task)
  })
  const data = await res.json()
  setTasks([...tasks,data])
}
//del
const deleteTask = async (id) =>{
  await fetch(`http://localhost:5000/tasks/${id}`, {
    method:'DELETE'
  })
  setTasks(tasks.filter((task) => task.id !==id))
}

//toggle
const toggleReminder =async (id) => {
  const taskToToggle = await fetchTask(id)
  const updTask = {...taskToToggle, 
    reminder : !taskToToggle.reminder}
  
  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    method:'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(updTask)
  })

  const data = await res.json()
  
  setTasks(tasks.map((task) => task.id === id ? 
  {...task, reminder: !data.reminder} : task))
}

  return (
      <div className="container">
      <Header 
      onAdd={() => setShowAddBtn(!ShowAddBtn)} 
      ShowAdd={ShowAddBtn}
      />
      {ShowAddBtn && <AddTask onAdd={addTask}
      />}
      {tasks.length > 0 ? (<Tasks tasks ={tasks} 
      onDelete={deleteTask}
      onToggle ={toggleReminder}
      />) : ( 'No Tasks Available')}
    
    </div>
  

 
  );
}


export default App;
