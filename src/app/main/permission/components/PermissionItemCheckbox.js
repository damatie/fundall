import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


const PermissionItemCheckBox = ({
    name,
    setCheckAll,
    checkAll,
    roleId,
    mainMenuId,
    list,
    id,
    checked,
}) => {
    const [state, setState] = React.useState({id, roleId, checked: false});
    
    React.useEffect(() => {
        console.log({state});
        setState({id, roleId, checked});
        // let items = checkAll;
        // items = items?.filter(item => item?.id !== id)
        // items.push(state);
        // setCheckAll(items);
    }, [id, checked]);

    React.useEffect(() => {
        const obj = Object.values(state);

        let items = checkAll;
        console.log({items});
        items = items.filter(item => item.id !== id && item.roleId !== roleId)
        console.log({items});
        items.push(state);
        setCheckAll(items);
        // console.log({checkAll});
    }, [state])


    // const handleChange = (event) => {
    //     setState({id, checked: event.target.checked});
    //     // let newArr = checkAll?.map(m => {
    //     //     if(m.id === id){
    //     //         m.checked ===  event.target.checked 
    //     //     }
    //     //     return m
    //     // });
    //     let items = checkAll;
    //     items = items.filter(item => item.id !== id)
    //     items.push(state);
    //     setCheckAll(items);console.log({checkAll});
    // };

    const handleChange = (event) => {
        console.log(event.target.checked);
        console.log(event.target.name);
        setState({id, roleId, checked: event.target.checked});
    };

  return (
    <FormControlLabel
        control={<Checkbox checked={state.checked} onChange={handleChange} name={id} />}
        label={name}
    />
  );
};

export default PermissionItemCheckBox;