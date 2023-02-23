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

    useEffect(() => {
        if (logedInVendor === null) {
            navigate('/login')
        } else {
            dispatch(getAllBillInfo())
        }
    }, [])


    let logedInVendor = JSON.parse(localStorage.getItem('vendorInfo'))

    return (
        <div className="flex flex-col justify-start items-center">
            <HomePageTopNav />
            <InvoiceCardContainer billData={billData} />
        </div>
    )
}

export default InvoiceHomePage