import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


const PermissionCheckBox = ({
    setPayload,
    payload,
    mainMenuId,
    subMenuId,
    roleId,
    name,
    id,
    checked,
}) => {
    const [state, setState] = React.useState({id, checked});
    React.useEffect(() => {
        setState({id, checked});
    }, [id, checked]);

    React.useEffect(() => {
        const obj = Object.values(state);
        let resp = {}
        resp[obj[0]] = obj[1];
        resp['mainMenuId'] = mainMenuId;
        resp['subMenuId'] = subMenuId;
        resp['roleId'] = roleId;
        payload.push(resp);
        payload.forEach((pay, index) => {
            if(pay.mainMenuId === mainMenuId && pay.subMenuId === subMenuId && pay.roleId === roleId){
                payload[index] = {
                    ...pay,
                    ...resp
                }
            }
        });
        const newArr = payload.filter((v,i,a)=>a.findIndex(t=>(t.mainMenuId === v.mainMenuId && t.subMenuId===v.subMenuId && t.roleId===v.roleId))===i);
        setPayload([...new Set(newArr)]);
    }, [state])


    const handleChange = (event) => {
        setState({id, checked: event.target.checked});
    };
  return (
    <FormControlLabel
        control={<Checkbox checked={state.checked} onChange={handleChange} name={id} />}
        label={name}
    />
  );
};

export default PermissionCheckBox;