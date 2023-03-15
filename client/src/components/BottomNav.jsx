import { useNavigate, Link, useLocation } from 'react-router-dom'

const BottomNav = ({ navValue }) => {
    console.log(navValue)
    const currentLocation = useLocation().pathname.toLowerCase();
    return (
        <div>
            <div className={navValue ? `transitionClass px-4 w-full flex items-center justify-between py-2 bg-[#1F213A] fixed lg:bottom-[-200px] bottom-${navValue} rounded-t-3xl` : `transitionClass px-4 w-full flex items-center justify-between py-2 bg-[#1F213A] fixed bottom-0 rounded-t-3xl`}>
                <Link to='/home' className={currentLocation.includes('/home') ? "flex items-center justify-start gap-2 text-[#7B5EF8] py-2 rounded-lg pl-2" : "flex items-center justify-start gap-2 text-white py-2 rounded-lg pl-2"}>
                    <i className="ph-house text-[24px]"></i>
                    {/* <p>Home</p> */}
                </Link>
                <Link to='/newinvoice' className={currentLocation.includes('/newinvoice') ? "flex items-center justify-start gap-2 text-[#7B5EF8] py-2 rounded-lg pl-2" : "flex items-center justify-start gap-2 text-white py-2 rounded-lg pl-2"}>
                    <i className="ri-add-circle-fill text-[20px]"></i>
                    {/* <p>New Invoice</p> */}
                </Link>
                <Link to='/clients' className={currentLocation.includes('/clients') ? "flex items-center justify-start gap-2 text-[#7B5EF8] py-2 rounded-lg pl-2" : "flex items-center justify-start gap-2 text-white py-2 rounded-lg pl-2"}>
                    <i className="ph ph-users-three text-[24px]"></i>
                    {/* <p>Clients</p> */}
                </Link>
                <Link to='/settings' className={currentLocation.includes('/settings') ? "flex items-center justify-start gap-2 text-[#7B5EF8] py-2 rounded-lg pl-2" : "flex items-center justify-start gap-2 text-white py-2 rounded-lg pl-2"}>
                    <i className="ph ph-gear-six text-[24px]"></i>
                    {/* <p>Settings</p> */}
                </Link>
            </div>
        </div>
    )
}

export default BottomNav