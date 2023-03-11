import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login'
import Users from './components/Users';
console.log('Lalala')

function App() {
  /*const [count, setCount] = useState(0)*/

  return (
    <Routes>
      <Route path="/gh-react-vite/" element={<Login />} />
      <Route path="/gh-react-vite/users" element={<Users />} />
    </Routes>

  )
}

export default App
 /*<Route path="/about" component={About} />*/