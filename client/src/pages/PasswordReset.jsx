import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const PasswordReset = ({ baseUrl }) => {

    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [modal, setModal] = useState(false)
    const { vendor_id, token } = useParams()
    const [inputType, setInputType] = useState('password');
    const [showPassword, setShowPassword] = useState(false)

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

        if (password === "" || password2 === "") {
            setError("Please fill in the fields")
            setTimeout(() => {
                setError("")
            }, 3000)
            return
        }

        if (password !== password2) {
            setError("Password fields must match")
            setTimeout(() => {
                setError("")
            }, 3000)
            return
        }

        setLoading(true)
        const response = await fetch(`${baseUrl}/auth/resetpassword/${token}/${vendor_id}`, {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ password })
        })

        if (response) {
            setLoading(false)
        }
        const data = await response.json()
        if (response.ok) {
            setLoading(false)
            setModal(true)
            console.log(data)
        }

        if (!response.ok) {
            setLoading(false)
            setError(data.msg)
            console.log(data)
        }
    }

    const toggleInput = () => {
        setInputType(inputType === 'password' ? 'text' : 'password')
        setShowPassword(!showPassword)
    }


    return (
        <div className='relative'>
            <div className="flex items-center text-white gap-10 justify-center bg-[#1F213A] py-4">
                <Link to='/login' className='py-1 mx-2 px-2 rounded-md border-[1px] border-[#7B5EF8] hover:bg-[#7B5EF8]'>Login</Link>
                <Link to='/register' className='py-1 mx-2 px-2 rounded-md border-[1px] border-[#7B5EF8] hover:bg-[#7B5EF8]'>Sign Up</Link>
            </div>
            <form onSubmit={updatePassword} className="text-white w-[90%] text-center md:w-[50%] fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] mx-auto justify-between gap-[5rem] bg-[#1F213A] p-8 rounded-md mb-10">
                <div className="block my-3 w-full relative">
                    {error && <p className="text-white text-center bg-red-600 py-1 px-2 mb-3">{error}</p>}
                    {/* {success && <p className="text-white text-center bg-green-600 py-[10px] px-2 mb-3">{success}</p>} */}
                    <h1>Reset your password</h1>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type={inputType} placeholder='******' className="focus:outline-none border-gray-300 rounded-[4px] border-[1px] pl-3 py-2 w-full mt-2 bg-[#141625]" />
                    <div className='absolute md:top-[40px] top-[40px] right-5 cursor-pointer'>
                        {showPassword ? <i className="ri-eye-fill" onClick={toggleInput}></i> : <i className="ri-eye-off-fill" onClick={toggleInput}></i>}
                    </div>
                    <input onChange={(e) => setPassword2(e.target.value)} value={password2} type={inputType} placeholder='******' className="focus:outline-none border-gray-300 rounded-[4px] border-[1px] pl-3 py-2 w-full mt-2 bg-[#141625]" />
                    <div className='absolute md:top-[90px] top-[90px] right-5 cursor-pointer'>
                        {showPassword ? <i className="ri-eye-fill" onClick={toggleInput}></i> : <i className="ri-eye-off-fill" onClick={toggleInput}></i>}
                    </div>
                </div>
                {!loading ?
                    <button className='mt-3 w-full bg-green-500 border-[1px] py-1 px-3 rounded-md cursor-pointer'>Reset Password</button>
                    :
                    <button type="submit" disabled className="buttonload cursor-not-allowed flex items-center justify-center gap-3 w-full bg-green-300 text-white py-2 rounded-[4px]">
                        <i className="fa fa-spinner fa-spin"></i>
                        <p>Reset Password</p>
                    </button>
                }

                {
                    modal &&
                    <div className="flex items-center justify-center fixed top-0 left-0 h-full w-full bg-black bg-opacity-[90%] z-[51]">
                        <div className='bg-white flex items-center justify-center py-10 px-5 w-[85%] lg:w-1/2 gap-4 flex-col rounded-lg text-black text-center relative'>
                            <i className="ri-checkbox-circle-fill text-7xl text-green-500"></i>
                            <p>Your password has been updated successfully click on the button below to login</p>
                            <Link to='/login' className='py-1 mx-2 px-2 rounded-md border-[1px] border-green-500 hover:bg-green-500 hover:text-white'>Login</Link>
                        </div>
                    </div>
                }
            </form >
        </div >
    )
}

export default PasswordReset