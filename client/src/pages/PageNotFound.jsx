import { Link, useNavigate } from 'react-router-dom'
import notFoundImage from '../assets/images/a8121abee959e18cbad25ad4046f76d8.gif'

const PageNotFound = () => {
    return (
        <div>
            <div className='flex items-center justify-center flex-col w-[80%] lg:w-[40%] py-[5rem] mx-auto text-white'>
                <img src={notFoundImage} alt="" />
                <p className='py-5'>Page Not Found</p>
                <p className='flex items-center'>Please take yourself back <Link to="/home" className='py-1 mx-2 px-2 rounded-md border-[1px] border-[#7B5EF8] hover:bg-[#7B5EF8]'>Home</Link> safely</p>
            </div>
        </div>
    )
}

export default PageNotFound