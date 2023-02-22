import Login from './pages/Login'
import './App.css'
import InvoiceHomePage from './pages/InvoiceHomePage'
import Sidenav from './components/Sidenav'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div className="App">
      <Router>
        <Sidenav />
        <Routes>
          <Route path='/' element={<InvoiceHomePage />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App

// #141625
// #1F213A
// #7B5EF8
