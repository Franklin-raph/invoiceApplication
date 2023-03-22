import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { reset, logoutVendor } from '../redux/vendorAuthSlice'

const HomePageTopNav = ({ billData }) => {

    const [loggedInVendor, setLoggedInVendor] = useState("")
    const [toggleLogout, setToggleLogout] = useState(false)
    const [greeting, setGreeting] = useState("")
    const dispatch = useDispatch()

    useEffect(() => {
        setLoggedInVendor(JSON.parse(localStorage.getItem("vendorInfo")))
        setGreeting([
            'What are you doing that early?',  // 12am - 5:59am
            'Good Morning', // 6am - 11:59pm
            'Good Afternoon', // 12pm - 5:59pm
            'Good Evening' // 6pm - 11:59pm
        ][parseInt(new Date().getHours() / 24 * 4)])

        console.log(new Date().getHours() / 24 * 4)
    }, [])

    function logout() {
        dispatch(reset())
        dispatch(logoutVendor())
    }

    // function checkProfileUpdate() {
    //     if (loggedInVendor.businessWesite === "") {
    //         console.log("In complete")
    //         console.log(loggedInVendor.businessWesite)
    //         setCheckUpdatedAccount(false)
    //     } else {
    //         console.log("Complete")
    //         setCheckUpdatedAccount(true)
    //     }
    // }

    console.log(loggedInVendor)

    return (
        <div className="text-white w-[100%] lg:w-[85%] ml-0 lg:ml-[10rem] px-[1rem] lg:px-[4rem] mt-[8rem] lg:mt-[4rem] mb-10">
            {loggedInVendor &&
                <div className='flex items-end justify-between mb-3 relative'>
                    {toggleLogout &&
                        <div className="absolute right-0 top-12 flex items-center bg-[#1F213A] px-3 py-1 gap-1" onClick={logout}>
                            <i className="fa-solid fa-right-from-bracket text-center text-sm"></i>
                            <p className='text-sm'>Logout</p>
                        </div>
                    }
                    <div className='lg:items-center gap-1 lg:gap-3 flex-col items-start'>
                        <p className='text-gray-500'>{new Date(new Date).toDateString()}.</p>
                        <div className='flex lg:items-center lg:flex-row gap-1 lg:gap-3 flex-col items-start'>
                            <p className='flex items-center'>{greeting}</p>
                            <div className='flex items-center gap-2'>
                                <p className='font-bold'>{loggedInVendor.fName} {loggedInVendor.lName}</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M225.86,102.82c-3.77-3.94-7.67-8-9.14-11.57-1.36-3.27-1.44-8.69-1.52-13.94-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52-3.56-1.47-7.63-5.37-11.57-9.14C146.28,23.51,138.44,16,128,16s-18.27,7.51-25.18,14.14c-3.94,3.77-8,7.67-11.57,9.14C88,40.64,82.56,40.72,77.31,40.8c-9.76.15-20.82.31-28.51,8S41,67.55,40.8,77.31c-.08,5.25-.16,10.67-1.52,13.94-1.47,3.56-5.37,7.63-9.14,11.57C23.51,109.72,16,117.56,16,128s7.51,18.27,14.14,25.18c3.77,3.94,7.67,8,9.14,11.57,1.36,3.27,1.44,8.69,1.52,13.94.15,9.76.31,20.82,8,28.51s18.75,7.85,28.51,8c5.25.08,10.67.16,13.94,1.52,3.56,1.47,7.63,5.37,11.57,9.14C109.72,232.49,117.56,240,128,240s18.27-7.51,25.18-14.14c3.94-3.77,8-7.67,11.57-9.14,3.27-1.36,8.69-1.44,13.94-1.52,9.76-.15,20.82-.31,28.51-8s7.85-18.75,8-28.51c.08-5.25.16-10.67,1.52-13.94,1.47-3.56,5.37-7.63,9.14-11.57C232.49,146.28,240,138.44,240,128S232.49,109.73,225.86,102.82Zm-11.55,39.29c-4.79,5-9.75,10.17-12.38,16.52-2.52,6.1-2.63,13.07-2.73,19.82-.1,7-.21,14.33-3.32,17.43s-10.39,3.22-17.43,3.32c-6.75.1-13.72.21-19.82,2.73-6.35,2.63-11.52,7.59-16.52,12.38S132,224,128,224s-9.15-4.92-14.11-9.69-10.17-9.75-16.52-12.38c-6.1-2.52-13.07-2.63-19.82-2.73-7-.1-14.33-.21-17.43-3.32s-3.22-10.39-3.32-17.43c-.1-6.75-.21-13.72-2.73-19.82-2.63-6.35-7.59-11.52-12.38-16.52S32,132,32,128s4.92-9.15,9.69-14.11,9.75-10.17,12.38-16.52c2.52-6.1,2.63-13.07,2.73-19.82.1-7,.21-14.33,3.32-17.43S70.51,56.9,77.55,56.8c6.75-.1,13.72-.21,19.82-2.73,6.35-2.63,11.52-7.59,16.52-12.38S124,32,128,32s9.15,4.92,14.11,9.69,10.17,9.75,16.52,12.38c6.1,2.52,13.07,2.63,19.82,2.73,7,.1,14.33.21,17.43,3.32s3.22,10.39,3.32,17.43c.1,6.75.21,13.72,2.73,19.82,2.63,6.35,7.59,11.52,12.38,16.52S224,124,224,128,219.08,137.15,214.31,142.11ZM173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34Z"></path></svg>
                            </div>
                        </div>
                    </div>
                    {loggedInVendor.profilePic ?
                        <div className='flex items-center w-[15%] md:w-[7%]'>
                            <img className='rounded-full w-[80%]' src={loggedInVendor.profilePic} alt="" />
                            <i className="ri-arrow-down-s-fill lg:hidden" onClick={() => setToggleLogout(!toggleLogout)}></i>
                        </div>
                        :
                        <div className='flex items-center w-[10%]'>
                            <i className="fa-solid fa-user text-3xl"></i>
                            <i className="ri-arrow-down-s-fill lg:hidden" onClick={() => setToggleLogout(!toggleLogout)}></i>
                        </div>
                    }
                </div>
            }
            <div className='flex items-center justify-between'>
                <div className='flex flex-col md:flex-row justify-between items-center w-full gap-10'>
                    <div className='items-center justify-between p-5 flex bg-[#7B5EF8] w-full rounded-lg'>
                        <div className='flex items-center justify-between flex-col'>
                            <p>Total Invoice(s)</p>
                            <p className='font-bold text-2xl'>{billData.data.length}</p>
                        </div>
                        <Link to="/newinvoice">
                            <div className="flex items-center justify-between bg-[#1F213A] rounded-full gap-2 py-1 px-2 hover:cursor-pointer">
                                <i className="ri-add-circle-fill text-xl"></i>
                                <p className="hidden lg:block">New Invoice</p>
                            </div>
                        </Link>
                    </div>
                    <div className='items-center justify-between p-5 flex bg-[#7B5EF8] w-full rounded-lg relative'>
                        {loggedInVendor.businessWesite === "" || loggedInVendor.profilePic === "" ?
                            <div className='flex items-start justify-between flex-col'>
                                <p>Todo - 2 / 3</p>
                                <p className='font-bold text-lg flex gap-[1px] items-center'>Update Your Porfile</p>
                            </div>
                            :
                            <div className='flex items-start justify-between flex-col'>
                                <p>Todo - 3 / 3</p>
                                <p className='font-bold text-lg flex gap-[1px] items-center'>Your Porfle is up to date</p>
                                {/* <p className=''><i className="ph ph-currency-gbp"></i>100 million</p> */}
                            </div>
                        }

                        <Link to="/settings" >
                            <div className="flex items-center justify-between bg-[#1F213A] rounded-full gap-2 py-1 px-2 hover:cursor-pointer">
                                <i className="ri-pencil-fill text-xl"></i>
                                <p className="hidden lg:block">Update Profile</p>
                            </div>
                            {loggedInVendor.businessWesite === "" || loggedInVendor.profilePic === "" ?
                                <span class="absolute right-[-5px] flex h-5 w-5 top-[-5px]">
                                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                    <span class="relative inline-flex rounded-full h-5 w-5 bg-[#fff]"></span>
                                </span>
                                : ""
                            }

                        </Link>
                    </div>
                    {/* <div className='items-center justify-between p-5 flex bg-[#7B5EF8] w-full rounded-lg'>
                        <div className='flex items-center justify-between flex-col'>
                            <p>Total Income</p>
                            <p className='font-bold text-xl flex gap-[1px] items-center'><i className="ph ph-currency-gbp"></i>100 million</p>
                        </div>
                        <Link to="#">
                            <div className="flex items-center justify-between bg-[#1F213A] rounded-full gap-2 py-1 px-2 hover:cursor-pointer">
                                <i className="ri-eye-fill text-xl"></i>
                                <p className="hidden lg:block">View Transactions</p>
                            </div>
                        </Link>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default HomePageTopNav