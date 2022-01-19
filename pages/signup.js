import Image from 'next/image'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import AuthLayout from '../components/layout/authLayout'
import TextInput from '../components/shared/textInput'
import Button from '../components/shared/button'
import {} from '../services/apiFactory'
import { UserContext } from '../state/UserContext'
      
export default function Signup(){

  const [userDetails, setUserDetails] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const handleChange = (e) => {
  const { value, name} = e.target;
  setUserDetails({...userDetails, [name]: value});
  }

  const {signUpUser,errors,success,setErrors,setSuccess} = useContext(UserContext)

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userDetails);
    signUpUser(userDetails)
  }

  useEffect(() => {
    setErrors(null)
    setSuccess(null)
  },[])


  return (
    <AuthLayout>
      <div className="w-7/12">
        <div className='block'>
          <Link href="/">
            <a>  <Image src='/img/logo2.png' height={40} width={81} placeholder="logo" /></a>
          </Link>
        </div>
        <div className='block text-4xl font-bold w-6/12 mx-auto  mt-20'>
        <span  className=' text-fundall-green'><Image src='/img/h-img.png' height={280} width={270} placeholder="image" /></span>
        </div>
        <div className='block text-4xl font-bold w-6/12 mx-auto mt-10'>
        <span  className=' text-fundall-green'>Welcome!</span> Let’s get to know you.
        </div>
        <div className='block text-xl font-semibold w-6/12 mx-auto mt-6'>
        <span  className=' block'>
          Your first step toward a better financial lifestyle starts here.
        </span> 
        </div>
      </div>
    <form onSubmit={handleSubmit} className='w-5/12'>
      <div className=" mt-10 bg-white rounded-lg shadow-md">
        <div className=' w-9/12  py-10 mx-auto'>
          { errors && <p className='bg-red-300 text-sm py-1 px-2 mb-3 text-white rounded'>{errors.message}</p> }
          { success && <p className='bg-green-500 text-sm py-1 px-2 mb-3 text-white rounded'>{success.message}</p> }
          <div className=' grid grid-cols-2 gap-4'>
            <span className='block '>
            <label htmlFor="firstname" className=' block  text-base font-medium'> First Name</label >
              <TextInput onChange={handleChange} name='firstname' type='text' placeholder='Enter First Name'/>
            </span>

            <span className='block'>
              <label htmlFor='lastname' className=' block  text-base font-medium'> Last Name</label>
              <TextInput onChange={handleChange} name='lastname' type='text' placeholder='Enter Last Name'/>
            </span>
          
          </div>

          <div className=' grid grid-cols-1 gap-7 pt-7'>
            <span className='block '>
              <label htmlFor="email" className=' block  text-base font-medium'> Email address</label >
                <TextInput onChange={handleChange} type='email' name='email'  placeholder='Enter Email'/>
            </span>

            <span className='block'>
              <label className=' block  text-base font-medium'> Password</label>
              <TextInput onChange={handleChange} type='password' name='password' placeholder='Enter Passworde'/>
            </span>
            <span className='block'>
              <label htmlFor='password_confirmation' className=' block text-base font-medium'> Confirm Password</label>
              <TextInput onChange={handleChange} name='password_confirmation' type='password' placeholder='Confirm Password'/>
            </span>
          </div>
          <div className=' w-full mt-6'>
            <Button type="submit" value="SIGN UP"/>
          </div>
          <div className=' text-center mt-8 text-base font-semibold'>
            Already have an account? 
            <Link href="/login">
            <a> <span className=' text-fundall-green cursor-pointer'>Login Here</span></a>
            </Link>
          </div>
          <div className='w-11/12 text-center mx-auto mt-8  text-lg'>
            <span className=' text-gray-500'>By clicking on Login, you agree to our</span> 
            <span className=' text-fundall-green'> Terms & Conditions and Privacy Policy</span> 
          </div>
        </div>
      </div>
      
    </form>
    
    </AuthLayout>
  )
}