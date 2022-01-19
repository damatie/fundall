export default function TextInput(props){
  const {type,placeholder,id, name, onChange} = props
  return(
    <div className=" block input-blocK">
      <input type={type} 
      id={id}
      name={name}
      className="block w-full rounded-md" placeholder={placeholder}
      onChange={onChange}
      />
    </div>
  )
}