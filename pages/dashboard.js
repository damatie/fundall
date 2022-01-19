import Image from 'next/image'
import Link from 'next/link'
import AppLayout from '../components/layout/appLayout'
import DataTable from '../components/shared/dataTable'
import TextInput from '../components/shared/textInput'
import Button from '../components/shared/button'
      
export default function Dashboard(){
  return (
    <AppLayout>
      <div className="w-5/12">
        <div className='block'>
          <Link href="/">
            <a>  <Image src='/img/logo2.png' height={40} width={81} placeholder="logo" /></a>
          </Link>
        </div>
        <div className='block  w-10/12  mt-20'>
          <div className='flex'>
            <span className='  inline-block w-w93 h-h86 bg-gray-300 rounded-p-img text-center pt-5'>
              <Image src='/icon/vector.svg' height={40} width={81} placeholder="logo" />
            </span>
            <span className=' inline-block ml-7 pt-6'>
              <span className=' block  text-2xl font-bold'>
              Babatunde Fashola
              </span>
              <span className='block text-lg font-medium pt-1'>
              baba2@gmail.com
              </span>
            </span>
          </div>
          <div className=' block w-full mt-10'>
            <span className=' text-xl font-medium block mb-1'>Target Monthly Expenses</span>
            <span className=' text-3xl font-bold block'>₦596,000</span>
            <span className='block mt-4'>
              <span className='block h-auto rounded-full bg-gray-100'>
                <span className=' h-2 bg-fundall-green block rounded-full' style={{width:'80%'}}>
                </span>
              </span>
            </span>
            <span className=' block border border-gray-200 mt-10   shadow-sm rounded-xl bg-white py-5 px-5'>
              <span className=' block font-medium'>
              Daily Expenses Summary
              </span>
              <div className='w-full mx-auto mt-7 px-3'>
               <DataTable/>
              </div>
            </span>
          </div>
        </div>
      </div>
    <div className='w-7/12 bg-gray-100 mb-10 h-auto rounded-md shadow-sm  px-10 pt-16 pb-2'>
      <div className=' flex flex-row w-full bg-white px-8 rounded-md shadow-sm'>
        <div className=' space-y-2 pt-14 pb-10 flex-1'>
          <span className=' block text-2xl font-bold'>
          Welcome back, <span className=' text-fundall-green'> Babatunde</span>
          </span>
          <span className=' block text-dark text-base font-medium'>
            Now, let’s get your expenses for this month
          </span>
        </div>
        <div className=' '>
          <span className=' inline-block -mt-11'>
          <Image src='/img/w-img3.png' height={187} width={317} placeholder="img" />
          </span>
        
        </div>
      </div>
      <div className=' w-full  py-10 mx-auto'>
          <div className=' grid grid-cols-1 gap-4'>
            <span className='block w-6/12 '>
            <label  className=' block  text-base font-medium'> Target Monthly Expenses</label >
              <TextInput type='text' placeholder='Enter Target Amount'/>
            </span>

            <span className='block w-6/12 '>
              <span className=' block  text-base font-medium'>Date</span>
              <TextInput type='date' placeholder='Enter Last Name'/>
            </span>
          
          </div>
            <div className=' mt-5 block  text-base font-medium'> Today’s Expenses</div>
          <div className=' grid grid-cols-2 gap-7 pt-3'>
            <span className='block '>
                <TextInput type='text'  placeholder='Enter Amount'/>
            </span>
            <span className='block '>
                <TextInput type='text'  placeholder='Enter Amount'/>
            </span>
          </div>
          <div className=' grid grid-cols-2 gap-7 pt-3'>
            <span className='block '>
                <TextInput type='text'  placeholder='Enter Amount'/>
            </span>
            <span className='block '>
                <TextInput type='text'  placeholder='Enter Amount'/>
            </span>
          </div>
          <div className=' grid grid-cols-2 gap-7 pt-3'>
            <span className='block '>
                <TextInput type='text'  placeholder='Enter Amount'/>
            </span>
            <span className='block '>
                <TextInput type='text'  placeholder='Enter Amount'/>
            </span>
          </div>
          <div className=' mt-6  text-right font-semibold text-xl'>
            <span  className='  inline-block pr-2'>
            Total Actual Expenses: 
            </span>
            <span>
            ₦ <span className=' bg-white  text-dark rounded-md inline-block w-3/12 py-3 px-3 border-2 border-fundall-green text-left'> 2,0000</span>
            </span>
          </div>
          <div className=' w-full mt-8'>
            <span className=' cursor-pointer border-2 border-white mx-auto block  w-4/12 text-center  py-4 rounded-lg bg-fundall-green font-bold'>SAVE TODAY’S EXPENSES</span>
          </div>
        </div>
    </div>
    
    </AppLayout>
  )
}