import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import HomePageTopNav from '../components/HomePageTopNav'
import InvoiceCardContainer from '../components/InvoiceCardContainer'
import { getAllBillInfo } from '../redux/clientBillSlice'
import { useDispatch, useSelector } from 'react-redux'


const InvoiceHomePage = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { billData } = useSelector((state) => state.clientBill)
    const { vendorData } = useSelector((state) => state.vendorAuth)

    console.log(vendorData)

    let logedInVendor = JSON.parse(localStorage.getItem('vendorInfo'))

    useEffect(() => {
        if (vendorData) {
            console.log("Logged in")
            navigate('/')
        }
        if (logedInVendor === null) {
            navigate('/login')
        } else {
            dispatch(getAllBillInfo())
        }
    }, [])



    return (
        <div className="flex flex-col justify-start items-center">
            <HomePageTopNav />
            <InvoiceCardContainer billData={billData} />
        </div>
    )
}

export default InvoiceHomePage