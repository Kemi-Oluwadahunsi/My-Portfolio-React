
import { Routes, Route } from 'react-router-dom'
import './App.scss'
import Layout from './components/Layout'
import Home from './components/Home/home'


function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
        </Route>
      </Routes>
      
    </div>
  )
}

export default App
