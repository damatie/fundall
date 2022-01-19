import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div  className='w-full '>
      <Head>
        <title>Fundall App</title>
        <meta name="description" content="Best way to save" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className=' xl:w-9/12 mx-auto'>
        <nav className=' flex mt-10'>
          <div className=' flex-1'>
          <Link href="/">
            <a>  <Image src='/../public/img/logo2.png' height={62} width={120} placeholder="logo" /></a>
          </Link>
         
          </div>
          <div className='  flex-none pt-3 space-x-4'>
          <Link href="/login">
            <a> <span className='  inline-block px-4 py-2 rounded-lg font-bold cursor-pointer'>LOG IN</span></a>
          </Link>

          <Link href="/signup">
          <span className=' bg-fundall-green inline-block px-4 py-2 rounded-lg font-bold cursor-pointer'>SIGN UP</span>
          </Link>
           
          </div>
        </nav>
        <div className='w-full pt-20'>
          <span className=' block mx-auto w-1/4'>
          <Image src='/../public/img/h-img.png' height={280} width={270} placeholder="image" />
          </span>
        </div>
        <div className='w-full pt-20 text-center'>
          <span className=' block text-4xl font-bold'>
            Fundall Expense Tracker
          </span>
          <span className=' block mt-5 text-4xl font-normal'>
          Mini Project Frontend
          </span>
          <span className=' block mt-20 text-xl font-bold'>
             by Babatunde Fashola
          </span>
        </div>
      </main>
    </div>
  )
}
