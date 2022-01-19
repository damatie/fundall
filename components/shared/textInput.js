export default function TextInput(props){
  const {type,placeholder,id, name} = props
  return(
    <div className=" block input-blocK">
      <input type={type} 
      id={id}
      name={name}
      className="block w-full rounded-md" placeholder={placeholder}
      />
    </div>
  )
}