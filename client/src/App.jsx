import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import InvoiceHomePage from './pages/InvoiceHomePage'
import Sidenav from './components/Sidenav'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import NewInvioce from './pages/NewInvioce'
import Itemlist from './pages/Itemlist'

function App() {

  const logedInVendor = localStorage.getItem('vendorInfo')
  // const navigate = useNavigate()

  useEffect(() => {
    if (logedInVendor) {
      // window.location.assign('/')
      console.log("first")
    }
  }, [])

  return (
    <div className="App">
      <Router>
        {logedInVendor && <Sidenav />}
        {/* <Sidenav /> */}
        <Routes>
          <Route path='/' element={<InvoiceHomePage />} />
          <Route path='/newinvoice' element={<NewInvioce />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/itemlist' element={<Itemlist />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App

// #141625
// #1F213A
// #7B5EF8
