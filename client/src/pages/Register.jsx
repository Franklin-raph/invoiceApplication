import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MultiStep from 'react-multistep'
import StepOne from '../components/StepOne'
import StepTwo from '../components/StepTwo'
import StepThree from '../components/StepThree'
import StepFour from '../components/StepFour'
import { useSelector, useDispatch } from 'react-redux'

const Register = ({ baseUrl }) => {
    const [fName, setFname] = useState("")
    const [lName, setLname] = useState("")
    const [email, setEmail] = useState("")
    const [businessContact, setBusinessContact] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [businessName, setBusinessName] = useState("")
    const [businessType, setBusinessType] = useState("")
    const [businessOwnersName, setBusinessOwnersName] = useState("")
    const [businessWesite, setBusinessWesite] = useState("")
    const [country, setCountry] = useState("")
    const [city, setCity] = useState("")
    const [streetAddress, setStreetAddress] = useState("")
    const [postalCode, setPostalCode] = useState("")
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
    }, [isLoading, isSuccess, isError,])

    const vendorDetails = {
        fName, lName, email, password, city, streetAddress, postalCode, country,
        businessName, businessOwnersName, businessType, businessWesite, confirmPassword, businessContact
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
                    setBusinessOwnersName={setBusinessOwnersName} setBusinessContact={setBusinessContact} />
            )
        case 3:
            return (
                <StepThree vendorDetails={vendorDetails} setCountry={setCountry} setCity={setCity}
                    setPostalCode={setPostalCode} setStreetAddress={setStreetAddress} nextStep={nextStep} prevStep={prevStep} />
            )
        case 4:
            return (
                <StepFour vendorDetails={vendorDetails} prevStep={prevStep} baseUrl={baseUrl} />
            )
    }

}

export default Register