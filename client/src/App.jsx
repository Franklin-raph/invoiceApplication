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
import BottomNav from './components/BottomNav'
import PageNotFound from './pages/PageNotFound'
import ForgotPassword from './pages/ForgotPassword'
import PasswordReset from './pages/PasswordReset'

function App() {

  const logedInVendor = localStorage.getItem('vendorInfo')
  const [darkToggle, setDarkToggle] = useState(false)
  const [navValue, setNavValue] = useState(-200)
  const [baseUrl, setBaseUrl] = useState("https://invoice-application-0qd7.onrender.com/api/v1")

  function toggleBackground() {
    console.log(darkToggle)
    setDarkToggle(!darkToggle)
  }

  function toggleNavOpen() {
    setNavValue(0)
  }

  function toggleNavClose() {
    setNavValue(-200)
  }


  return (
    <div className={`${darkToggle && 'dark'} relative`}>
      <Router>
        {logedInVendor && <Sidenav toggleBackground={toggleBackground} />}
        {logedInVendor && <Topnav toggleNavOpen={toggleNavOpen} toggleNavClose={toggleNavClose} toggleBackground={toggleBackground} />}
        <Routes>
          <Route path='/home' element={<InvoiceHomePage baseUrl={baseUrl} />} />
          <Route path='/' element={<InvoiceHomePage />} />
          <Route path='/newinvoice' element={<NewInvioce baseUrl={baseUrl} />} />
          <Route path='/register' element={<Register baseUrl={baseUrl} />} />
          <Route path='/login' element={<Login baseUrl={baseUrl} />} />
          <Route path='/itemlist/:billId' element={<Itemlist />} />
          <Route path='/invoicepreview/:billId' element={<PreviewInvoice baseUrl={baseUrl} />} />
          <Route path='/settings' element={<VendorSettings baseUrl={baseUrl} />} />
          <Route path='/clients' element={<Clients />} />
          <Route path='/forgotpassword' element={<ForgotPassword baseUrl={baseUrl} />} />
          <Route path='/resetpassword/:vendor_id/:token' element={<PasswordReset baseUrl={baseUrl} />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        {logedInVendor && <BottomNav navValue={navValue} toggleBackground={toggleBackground} />}
      </Router>
    </div>
  )
}

export default App

// #141625
// #1F213A
// #7B5EF8
