import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllBillInfo } from '../redux/clientBillSlice'
import { useDispatch, useSelector } from 'react-redux'
import SearchBar from "../components/SearchBar";
import LoadingSpinner from '../components/LoaderComponent'


const Clients = () => {
    const [searchWord, setSearchWord] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { billData } = useSelector((state) => state.clientBill)
    const { vendorData } = useSelector((state) => state.vendorAuth)

    const [clientInfo, setClientInfo] = useState()
    const [clientModal, setClientModal] = useState(false)
    const [loading, setLoading] = useState(false)

    let logedInVendor = JSON.parse(localStorage.getItem('vendorInfo'))

    useEffect(() => {
        setLoading(true)
        if (vendorData) {
            navigate('/clients')
        }
        if (logedInVendor === null) {
            navigate('/login')
        } else {
            dispatch(getAllBillInfo())
            setLoading(false)
        }
    }, [])

    function viewClientInfo(clientId) {
        setClientModal(true)
        let client = billData.data.filter(client => {
            return client._id === clientId
        })
        setClientInfo(client[0])
        console.log(client)
        console.log(clientInfo)
    }

    return (
        <div className="lg:px-[100px] px-5 lg:ml-[10rem] mx-auto w-full lg:w-[90%] md:mt-2 mt-[6rem] md:mb-2 mb-[10rem]">

            <div className='searchAndText text-white mt-20 w-full lg:w-[90%] mx-auto'>
                <h1 className='w-full'>My Clients</h1>
                <SearchBar setSearchWord={setSearchWord} />
            </div>
            {billData ?
                <div className="text-white w-full lg:w-[90%] mx-auto">
                    <div className='relative grid grid-cols-1 lg:grid-cols-2 gap-3 mt-3'>
                        {billData && billData.data.filter((client) => {
                            if (searchWord === "") return client
                            else if (client.clientName.toLowerCase().includes(searchWord.toLowerCase())) return client
                        }).map((client) => (
                            <div onClick={() => viewClientInfo(client._id)} key={client._id} className="bg-[#1F213A] p-5 rounded-md hover:cursor-pointer flex items-center justify-between">
                                <p>{client.clientName}</p>
                                <i className="ph ph-eye text-[20px]"></i>
                            </div>
                        ))}
                    </div>
                </div>
                :
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 animation-placeholder w-full mx-auto lg:w-[90%]'>
                    <div className="bg-[#1F213A] p-5 rounded-md animated-background"></div>
                    <div className="bg-[#1F213A] p-5 rounded-md animated-background"></div>
                    <div className="bg-[#1F213A] p-5 rounded-md animated-background"></div>
                </div>
            }
            {
                clientModal &&
                <div className="flex items-center justify-center fixed top-0 left-0 h-full w-full bg-black bg-opacity-[90%] z-[51]">
                    <div className='bg-white py-10 px-5 w-[85%] md:w-[40%] gap-4 rounded-lg text-black text-center relative'>
                        <i className="ri-close-circle-fill absolute top-2 right-2 text-2xl text-[#0f141d] cursor-pointer" onClick={() => setClientModal(!clientModal)}></i>
                        <div className='clientInfo mt-2'>
                            <div className='flex gap-2 items-center'>
                                <i className='ri-user-3-line'></i>
                                <p>{clientInfo.clientName}</p>
                            </div>
                        </div>
                        <div className='clientInfo mt-2'>
                            <div className='flex gap-2 items-center'>
                                <i className='ri-mail-fill'></i>
                                <a href={`mailto:${clientInfo.clientEmail}`}>{clientInfo.clientEmail}</a>
                            </div>
                        </div>
                        <div className='clientInfo mt-2'>
                            <div className='flex gap-2 items-center'>
                                <i className='ph ph-globe'></i>
                                <p>{clientInfo.clientCountry}</p>
                            </div>
                        </div>
                        <div className='clientInfo mt-2'>
                            <div className='flex gap-2 items-center'>
                                <i className='ri-building-fill'></i>
                                <p>{clientInfo.clientCity}</p>
                            </div>
                        </div>

                        <div className='clientInfo mt-2'>
                            <div className='flex gap-2 items-center'>
                                <i className='ph ph-phone'></i>
                                <a href={`tel:+${2348139692969}`}>{clientInfo.clientPhone}</a>
                                {/* <p>+234 813 969 296 9</p> */}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div >
    )
}

export default Clients