import { useNavigate, Link, useLocation } from 'react-router-dom'

const BottomNav = ({ navValue }) => {
    console.log(navValue)
    const currentLocation = useLocation().pathname.toLowerCase();
    return (
        <div>
            <div className={navValue ? `bottomNav px-4 w-full flex items-center justify-between py-5 bg-[#1F213A] fixed rounded-t-3xl` : `bottomNav showNav px-4 w-full flex items-center justify-between py-4 bg-[#1F213A] fixed rounded-t-[20px]`}>
                <Link to='/home' className={currentLocation.includes('/home') ? "flex  flex-col items-center justify-start text-[#7B5EF8]  rounded-lg " : "flex flex-col items-center justify-start text-white  rounded-lg "}>
                    <i className="fa-solid fa-house-chimney text-[18px]"></i>
                    <p className='text-[14px]'>Home</p>
                </Link>
                <Link to='/newinvoice' className={currentLocation.includes('/newinvoice') ? "flex flex-col items-center justify-start text-[#7B5EF8] rounded-lg " : "flex flex-col items-center justify-start text-white rounded-lg "}>
                    <i className="ph ph-plus-circle text-[20px]"></i>
                    <p className='text-[14px]'>New</p>
                </Link>
                <Link to='/clients' className={currentLocation.includes('/clients') ? "flex  flex-col items-center justify-start  text-[#7B5EF8]  rounded-lg " : "flex flex-col items-center justify-start  text-white  rounded-lg "}>
                    <i className="fa-solid fa-users text-[18px]"></i>
                    <p className='text-[14px]'>Clients</p>
                </Link>
                <Link to='/settings' className={currentLocation.includes('/settings') ? "flex  flex-col items-center justify-start  text-[#7B5EF8]  rounded-lg " : "flex  flex-col items-center justify-start  text-white  rounded-lg "}>
                    <i className="fa-solid fa-user-gear text-[18px]"></i>
                    <p className='text-[14px]'>Settings</p>
                </Link>
            </div>
        </div>
    )
}

export default BottomNav