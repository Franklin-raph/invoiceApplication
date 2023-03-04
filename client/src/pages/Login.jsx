import { useState, useEffect } from 'react'
import LoginImage from '../assets/images/teaching-img.png'
import { Link, useNavigate } from 'react-router-dom'
import Alert from '../components/Alert'
import { useSelector } from 'react-redux'
import LoadingSpinner from '../components/LoaderComponent'

const Login = () => {

    // const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState("frank1@gmail.com")
    const [password, setPassword] = useState("123456")
    const [message, setMessage] = useState("")
    const [alertType, setAlertType] = useState("")
    const { vendorData } = useSelector((state) => state.vendorAuth)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (vendorData) {
            navigate('/')
        }
    }, [])


    const handleVedorLogin = async (e) => {
        setLoading(true)
        e.preventDefault();
        const response = await fetch('https://invoice-application-0qd7.onrender.com/api/v1/auth/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        if (response) {
            setLoading(false)
        }
        const data = await response.json();
        if (!response.ok) {
            setMessage(data.err)
            setAlertType("Danger")
            setTimeout(() => {
                setMessage("")
                setAlertType("")
            }, 3000)
        }
        if (response.ok) {
            localStorage.setItem('vendorInfo', JSON.stringify(data))
            navigate('/')
            location.reload()
            setAlertType("Success")
        }
    }

    return (
        <div className="p-12 mx-auto w-full h-screen flex justify-center items-center">
            {loading && <LoadingSpinner />}
            <form className="relative flex items-center h-full justify-between gap-9 rounded-[12px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]" onSubmit={handleVedorLogin}>
                <div className="w-full p-12">
                    <h1 className="text-start text-xl text-white">Sign In</h1>
                    {message && <Alert message={message} alertType={alertType} />}
                    <label className="block my-7">
                        <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className="focus:outline-none border-gray-300 rounded-[4px] border-[1px] pl-3 py-2 w-full" />
                    </label>
                    <label className="block my-7">
                        <input type="password" placeholder='********' value={password} onChange={(e) => setPassword(e.target.value)} className="focus:outline-none border-gray-300 rounded-[4px] border-[1px] pl-3 py-2 w-full" />
                    </label>
                    <input type="submit" value="Sign In" className="w-full bg-green-500 text-white py-2 rounded-[4px] hover:cursor-pointer" />
                    <p className="text-center pt-3 text-white">Don't have an account? <Link to='/register'>Sign Up</Link> </p>
                </div>
                <img src={LoginImage} className="w-1/2" alt="" />
            </form>
        </div >
    )
}

export default Login