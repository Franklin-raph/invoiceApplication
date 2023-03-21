import { useState } from 'react'
import { Link } from 'react-router-dom'

const ForgotPassword = ({ baseUrl }) => {

    const [email, setEmail] = useState("frank45@gmail.com")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState("")
    const [loading, setLoading] = useState(false)

    async function verifyEmail(e) {
        e.preventDefault()
        if (email === "") {
            setError("Please fill in the field")
            setTimeout(() => {
                setError("")
            }, 3000)
            return
        }
        setLoading(true)
        const response = await fetch(`${baseUrl}/auth/forgotpassword`, {
            method: "POST",
            body: JSON.stringify({ email }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        if (response) {
            setLoading(false)
        }
        const data = await response.json()
        if (!response.ok) {
            setError(data.msg)
            setTimeout(() => {
                setError("")
            }, 3000)
            return
        }
        if (response.ok) {
            setEmail("")
            setSuccess(data.msg)
            setTimeout(() => {
                setSuccess("")
            }, 7000)
            return
        }
    }

    return (
        <div>
            <div className="flex items-center text-white gap-10 justify-center bg-[#1F213A] py-4">
                <Link to='/login' className='py-1 mx-2 px-2 rounded-md border-[1px] border-[#7B5EF8] hover:bg-[#7B5EF8]'>Login</Link>
                <Link to='/register' className='py-1 mx-2 px-2 rounded-md border-[1px] border-[#7B5EF8] hover:bg-[#7B5EF8]'>Sign Up</Link>
            </div>
            <form onSubmit={verifyEmail} className="text-white w-[90%] text-center md:w-[50%] fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] mx-auto justify-between gap-[5rem] bg-[#1F213A] p-8 rounded-md mb-10">
                <div className="block my-3 w-full relative">
                    {error && <p className="text-white text-center bg-red-600 py-1 px-2 mb-3">{error}</p>}
                    {success && <p className="text-white text-center bg-green-600 py-[10px] px-2 mb-3">{success}</p>}
                    <h1>Vendor Reset Password Request</h1>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder='frank@gmail.com' className="focus:outline-none border-gray-300 rounded-[4px] border-[1px] pl-3 py-2 w-full mt-2 bg-[#141625]" />
                </div>
                {!loading ?
                    <button className='mt-3 w-full bg-green-500 border-[1px] py-1 px-3 rounded-md cursor-pointer'>Reset Password Link</button>
                    :
                    <button type="submit" disabled className="buttonload cursor-not-allowed flex items-center justify-center gap-3 w-full bg-green-300 text-white py-2 rounded-[4px]">
                        <i className="fa fa-spinner fa-spin"></i>
                        <p>Reset Password Link</p>
                    </button>
                }

            </form >
        </div >
    )
}

export default ForgotPassword