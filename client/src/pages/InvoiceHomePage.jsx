import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import HomePageTopNav from '../components/HomePageTopNav'
import InvoiceCardContainer from '../components/InvoiceCardContainer'
import { getAllBillInfo } from '../redux/clientBillSlice'
import { useDispatch, useSelector } from 'react-redux'
import LoadingSpinner from '../components/LoaderComponent'


const InvoiceHomePage = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { billData } = useSelector((state) => state.clientBill)
    const { vendorData } = useSelector((state) => state.vendorAuth)

    console.log(vendorData)

    let logedInVendor = JSON.parse(localStorage.getItem('vendorInfo'))

    useEffect(() => {
        if (vendorData) {
            navigate('/')
        }
        if (logedInVendor === null) {
            navigate('/login')
        } else {
            dispatch(getAllBillInfo())
        }
    }, [])

    return (
        <>
            {billData ?
                <div className="flex flex-col justify-start items-center">
                    <HomePageTopNav billData={billData} />
                    <InvoiceCardContainer billData={billData} />
                </div>
                :
                // <>Loading</>
                <LoadingSpinner />
            }
        </>

    )
}

export default InvoiceHomePage