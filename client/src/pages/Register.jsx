import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MultiStep from 'react-multistep'
import StepOne from '../components/StepOne'
import StepTwo from '../components/StepTwo'
import StepThree from '../components/StepThree'
import StepFour from '../components/StepFour'
import { useSelector, useDispatch } from 'react-redux'

const Register = () => {
    const [fName, setFname] = useState("Frank")
    const [lName, setLname] = useState("Raph")
    const [email, setEmail] = useState("frank@gmail.com")
    const [password, setPassword] = useState("12345")
    const [confirmPassword, setConfirmPassword] = useState("12345")
    const [businessName, setBusinessName] = useState("frank tech")
    const [businessType, setBusinessType] = useState("web")
    const [businessOwnersName, setBusinessOwnersName] = useState("frank raph")
    const [businessWesite, setBusinessWesite] = useState("frank.com")
    const [country, setCountry] = useState("Nigeria")
    const [city, setCity] = useState("Awka")
    const [streetAddress, setStreetAddress] = useState("Ifite")
    const [postalCode, setPostalCode] = useState("421010")
    const [formStep, setFormStep] = useState(1)


    // Proceed to the next step
    function nextStep() {
        setFormStep(formStep + 1)
    }

    // Return to previous step
    function prevStep() {
        setFormStep(formStep - 1)
    }

    const { vendorData, isLoading, isSuccess, isError, message } = useSelector(state => state.vendorAuth)

    // const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        if (isSuccess || vendorData) {
            navigate('/')
        }
    }, [])

    const vendorDetails = {
        fName, lName, email, password, city, streetAddress, postalCode, country,
        businessName, businessOwnersName, businessType, businessWesite, confirmPassword
    }

    switch (formStep) {
        case 1:
            return (
                <StepOne vendorDetails={vendorDetails} setFname={setFname} setLname={setLname} setEmail={setEmail}
                    setPassword={setPassword} setConfirmPassword={setConfirmPassword} nextStep={nextStep} />
            )
        case 2:
            return (
                <StepTwo vendorDetails={vendorDetails} nextStep={nextStep} prevStep={prevStep}
                    setBusinessName={setBusinessName} setBusinessType={setBusinessType}
                    setBusinessOwnersName={setBusinessOwnersName} setBusinessWesite={setBusinessWesite} />
            )
        case 3:
            return (
                <StepThree vendorDetails={vendorDetails} setCountry={setCountry} setCity={setCity}
                    setPostalCode={setPostalCode} setStreetAddress={setStreetAddress} nextStep={nextStep} prevStep={prevStep} />
            )
        case 4:
            return (
                <StepFour vendorDetails={vendorDetails} prevStep={prevStep} />
            )
    }

}

export default Register