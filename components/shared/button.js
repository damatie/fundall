export default function Button(props){
  const {value} = props
  return(
    <>
    <button className=" w-full text-lg font-semibold shadow-md bg-fundall-green button-lg block text-center">
      {value}
    </button>
    </>
  )
}