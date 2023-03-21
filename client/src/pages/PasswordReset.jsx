import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const PasswordReset = ({ baseUrl }) => {

    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const { vendor_id, token } = useParams()

    useEffect(() => {
        console.log(vendor_id, token)
        getRoute()
    }, [])

    async function getRoute() {
        const response = await fetch(`${baseUrl}/auth/resetpassword/${token}/${vendor_id}`)
        const data = await response.json()
        console.log(data)
    }

    async function updatePassword(e) {
        e.preventDefault()
        console.log(password)
        const response = await fetch(`http://localhost:5000/api/v1/auth/resetpassword/${token}/${vendor_id}`, {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ password })
        })
        const data = await response.json()
        if (response.ok) {
            console.log(data)
        }

        if (!response.ok) {
            console.log(data)
        }
        console.log("Password Reset")
    }

    return (
        <div>
            <div className="flex items-center text-white gap-10 justify-center bg-[#1F213A] py-4">
                <Link to='/login' className='py-1 mx-2 px-2 rounded-md border-[1px] border-[#7B5EF8] hover:bg-[#7B5EF8]'>Login</Link>
                <Link to='/register' className='py-1 mx-2 px-2 rounded-md border-[1px] border-[#7B5EF8] hover:bg-[#7B5EF8]'>Sign Up</Link>
            </div>
            <form onSubmit={updatePassword} className="text-white w-[90%] text-center md:w-[50%] fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] mx-auto justify-between gap-[5rem] bg-[#1F213A] p-8 rounded-md mb-10">
                <div className="block my-3 w-full relative">
                    {/* {error && <p className="text-white text-center bg-red-600 py-1 px-2 mb-3">{error}</p>}
                    {success && <p className="text-white text-center bg-green-600 py-[10px] px-2 mb-3">{success}</p>} */}
                    <h1>Reset your password</h1>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type="text" placeholder='******' className="focus:outline-none border-gray-300 rounded-[4px] border-[1px] pl-3 py-2 w-full mt-2 bg-[#141625]" />
                    <input onChange={(e) => setPassword2(e.target.value)} value={password2} type="text" placeholder='******' className="focus:outline-none border-gray-300 rounded-[4px] border-[1px] pl-3 py-2 w-full mt-2 bg-[#141625]" />
                </div>
                <button className='mt-3 w-full bg-green-500 border-[1px] py-1 px-3 rounded-md cursor-pointer'>Reset Password</button>
            </form >
        </div >
    )
}

export default PasswordReset