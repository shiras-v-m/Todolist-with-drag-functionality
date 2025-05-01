import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import Counts from './components/Counts'

function App() {
  const [userInput, setUserInput] = useState('')
  const [todos, setTodos] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [editId, setEditId] = useState(null)

  const [completedTodos, setCompletedTodos] = useState(0)
  const [totalTodos, setTotalTodos] = useState(0)

  const handleEditMode = (id) => {
    setEditMode(true)
    const todoToEdit = todos.find((todo) => todo.id === id)
    setUserInput(todoToEdit.text)
    setEditId(id)

    console.log("edit mode activated", id);

  }


  const updateItem = (id) => {
    if (userInput.trim() === '') {
      alert('Cannot update to an empty todo');
      return;
    }
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, text: userInput };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEditMode(false);
    setUserInput("");
    setEditId(null);

  };


  const updateComplete = (id) => {
    setTodos(todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed }
      }
      return todo
    }

    ))
    setEditMode(false)
  }
  const deleteItem = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }
  const addTodo = () => {
    if (userInput.trim() === '') {
      alert('Please enter a todo item')
      return
    }
    const newTodo = {
      id: Date.now().toString(),
      text: userInput,
      completed: false,
    }
    setTodos([...todos, newTodo])
    setUserInput('')
  }

// Drag and drop functionality  
  const reorderTodos = (startIndex, endIndex) => {
    const newTodos = Array.from(todos);
    const [removed] = newTodos.splice(startIndex, 1);
    newTodos.splice(endIndex, 0, removed);
    setTodos(newTodos);
  }


  // To track the current state of the todo list
  useEffect(() => {
    let completedCount=0
    let totalTodosCount=0

    //we are not returning anything from todos so instead of map we can use forEach
     todos.forEach((todo) => {
      if (todo.completed) {
        completedCount=completedCount+1
      }
    totalTodosCount=totalTodosCount+1
    })
    setTotalTodos(totalTodosCount)
    setCompletedTodos(completedCount) 


    console.log('todos', todos);
    todos.forEach((todo) => {
      console.log(todo.id);
    });
  }, [todos])

  return (
    <div className='container'>
      <h2>TodoList</h2>
      <Counts completedTodos={completedTodos} totalTodos={totalTodos}/>
      <TodoInput userInput={userInput} setUserInput={setUserInput} addTodo={addTodo} updateItem={updateItem} setEditMode={setEditMode} editMode={editMode} editId={editId} />
      <TodoList todos={todos} updateComplete={updateComplete} deleteItem={deleteItem} handleEditMode={handleEditMode} editMode={editMode}  reorderTodos={reorderTodos}/>
    </div> 
  )
}

export default App
