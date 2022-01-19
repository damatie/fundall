import Image from 'next/image'
import Link from 'next/link'
import AuthLayout from '../components/layout/authLayout'
import TextInput from '../components/shared/textInput'
import Button from '../components/shared/button'
      
export default function Signup(){
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
    <div className='w-5/12'>
      <div className=" mt-10 bg-white rounded-lg shadow-md">
        <div className=' w-9/12  py-10 mx-auto'>
          <div className=' grid grid-cols-2 gap-4'>
            <span className='block '>
            <label className=' block  text-base font-medium'> First Name</label >
              <TextInput type='text' placeholder='Enter First Name'/>
            </span>

            <span className='block'>
              <span className=' block  text-base font-medium'> Last Name</span>
              <TextInput type='text' placeholder='Enter Last Name'/>
            </span>
          
          </div>

          <div className=' grid grid-cols-1 gap-7 pt-7'>
            <span className='block '>
              <label  className=' block  text-base font-medium'> Email address</label >
                <TextInput type='text'  placeholder='Enter Email'/>
            </span>

            <span className='block'>
              <label className=' block  text-base font-medium'> Password</label>
              <TextInput type='password' placeholder='Enter Passworde'/>
            </span>
            <span className='block'>
              <label className=' block  text-base font-medium'> Confirm Password</label>
              <TextInput type='password' placeholder='Confirm Password'/>
            </span>
          </div>
          <div className=' w-full mt-6'>
            <Button value="SIGN UP"/>
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
      
    </div>
    
    </AuthLayout>
  )
}