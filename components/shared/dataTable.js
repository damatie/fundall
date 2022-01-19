import Image from 'next/image'
export default function DataTable({summary}){
  // console.log(summary)
  return(
    < div className=' w-full'>
    <table className="table-fixed w-full">
      <thead>
        <tr>
          <th className=' w-1/12 pb-2'></th>
          <th className='text-left pb-2 w-7/12'>Date</th>
          <th className=' text-right pb-2'>Amount</th>
        </tr>
      </thead>
      <tbody className=" font-medium">
        <tr className=' border-b border-gray-200'>
          <td  className='pt-5 pb-5'>
            <span className=" rounded-full li-bullet "></span>
          </td>
          <td className='pt-5 pb-5 text-dark'>25 Nov, 2018</td>
          <td className='pt-5 pb-5 text-fundall-green text-right'>₦30,000</td>
        </tr>
        <tr className=' border-b border-gray-200'>
          <td  className=' pt-5 pb-5'>
          <span className=" rounded-full li-bullet "> </span>
          </td>
          <td className=' pt-5 pb-5 text-dark'>30 Nov, 2018</td>
          <td className='pt-5 pb-5 text-fundall-green text-right'>₦30,000</td>
        </tr>
        <tr className=' border-b border-gray-200'>
          <td  className=' pt-5 pb-5'>
          <span className=" rounded-full li-bullet "> </span>
          </td>
          <td className=' pt-5 pb-5 text-dark'>30 Nov, 2018</td>
          <td className='pt-5 pb-5 text-fundall-green text-right'>₦30,000</td>
        </tr>
      </tbody>
    </table>
  <span className=' block w-6/12 mx-auto mt-10  text-lg font-medium '>  
    <span className=' inline-block space-x-3 pb-5 text-dark pr-5'>
      <span className=' border border-gray-200 py-1 px-3 rounded-md'>1</span>
      <span>of</span>
      <span>5</span>
    </span>
    <span className=" inline-block ">
      <span className=" inline-block pagination rounded-full text-center cursor-pointer">
      <Image src='/icon/left.svg' height={10} width={10} placeholder="logo" />
      </span>
      <span className=" inline-block pagination rounded-full text-center cursor-pointer">
      <Image src='/icon/right.svg' height={10} width={10} placeholder="logo" />
      </span>
    </span>
  </span>
  </div>
  )
}