import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import InvoiceHomePage from './pages/InvoiceHomePage'
import Sidenav from './components/Sidenav'
import Topnav from './components/Topnav'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import NewInvioce from './pages/NewInvioce'
import Itemlist from './pages/Itemlist'
import PreviewInvoice from './pages/PreviewInvoice'
import { useState } from 'react'
import VendorSettings from './pages/VendorSettings'
import Clients from './pages/Clients'

function App() {

  const logedInVendor = localStorage.getItem('vendorInfo')
  const [darkToggle, setDarkToggle] = useState(false)

  function toggleBackground() {
    console.log(darkToggle)
    setDarkToggle(!darkToggle)
  }


  return (
    <div className={`${darkToggle && 'dark'}`}>
      <Router>
        {logedInVendor && <Sidenav toggleBackground={toggleBackground} />}
        {logedInVendor && <Topnav toggleBackground={toggleBackground} />}
        <Routes>
          <Route path='/home' element={<InvoiceHomePage />} />
          <Route path='/' element={<InvoiceHomePage />} />
          <Route path='/newinvoice' element={<NewInvioce />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/itemlist/:billId' element={<Itemlist />} />
          <Route path='/invoicepreview/:billId' element={<PreviewInvoice />} />
          <Route path='/settings' element={<VendorSettings />} />
          <Route path='/clients' element={<Clients />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App

// #141625
// #1F213A
// #7B5EF8
