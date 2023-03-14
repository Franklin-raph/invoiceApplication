import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllBillInfo } from '../redux/clientBillSlice'
import { useDispatch, useSelector } from 'react-redux'
import SearchBar from "../components/SearchBar";
import LoadingSpinner from '../components/LoaderComponent'


const Clients = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { billData } = useSelector((state) => state.clientBill)
    const { vendorData } = useSelector((state) => state.vendorAuth)

    const [allClients, setAllClients] = useState([])

    let logedInVendor = JSON.parse(localStorage.getItem('vendorInfo'))

    useEffect(() => {
        if (vendorData) {
            navigate('/clients')
        }
        if (logedInVendor === null) {
            navigate('/login')
        } else {
            dispatch(getAllBillInfo())
        }
    }, [])
    console.log(allClients)

    return (
        <div className="lg:px-[100px] px-5 lg:ml-[10rem] mx-auto w-full lg:w-[90%]">
            <div className="text-white mt-20 w-full lg:w-[90%] mx-auto">
                <div className='searchAndText'>
                    <h1 className='w-full'>My Clients</h1>
                    <SearchBar />
                </div>
                <div className='relative grid grid-cols-1 lg:grid-cols-2 gap-3 mt-3'>
                    {billData && billData.data.map(client => (
                        <div key={client._id} className="bg-[#1F213A] p-5 rounded-md hover:cursor-pointer">
                            <p>{client.clientName}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Clients