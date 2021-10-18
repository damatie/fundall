import React from 'react';
import {capitalizeWords} from '../../../shared/capitalizeWords';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PermissionList from './PermissionList';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PermissionItemCheckbox from './PermissionItemCheckbox';
import Checkbox from '@material-ui/core/Checkbox';

// const getValue = (endpoints, keyWord) => {
//   return endpoints.includes(keyWord);
// };

const permissions = [
    {
        id: "canAdd",
        name: "Can Add"
    },
    {
        id: "canDelete",
        name: "Can Delete"
    },
    {
        id: "canEdit",
        name: "Can Edit"
    },
    {
        id: "canView",
        name: "Can View"
    },
]

const getPermission = (item, permission) => {
    try{
        return permission[item.id];
    }catch(e){
        return false;
    }
}

const SubMenuList = ({
    setPayload,
    payload,
    data,
    role,
    mainMenuId
}) => {
    const [permissionList, setPermissionList] = React.useState([]);
    const [checkAll, setCheckAll] = React.useState([]);
    // console.log({checkAll});

    React.useEffect(() => {
        setPermissionList(data.userPermission)
    }, [data]);

    const handleChange = (event, id) => {
        // let newArr = checkAll?.map(m => {
        //     if(m.id === id){
        //         m.checked ===  event.target.checked 
        //     }
        //     return m
        // });
        let items = checkAll;
        items = items.filter(item => item.id !== id)
        items.push({id, checked: event.target.checked});
        setCheckAll(items);
    };

    const isChecked = (id) => {
        const value = permissionList?.find(item => (item?.mainMenuId === mainMenuId && item?.subMenuId === id && item?.roleId === role?.id)
        && (item?.canAdd === true && item?.canEdit === true && item?.canDelete === true && item?.canView === true));
        // console.log({value});
        return value ? true : false;
    }

  return (
    <div>
        <List>
            {data.subMenu.filter( sub => sub.mainMenuId === mainMenuId).map((sub) => {
                return (
                <ListItem>
                    <ListItemText
                    id = {sub.id}
                    primary={<PermissionItemCheckbox checked={isChecked(sub.id)} checkAll={checkAll} setCheckAll={setCheckAll} name={capitalizeWords(sub.title)} id={sub.id} mainMenuId={mainMenuId} roleId={role?.id} permissionList={permissionList}/>}
                    secondary={<PermissionList checkAll={checkAll} setPayload={setPayload} payload={payload} mainMenuId={mainMenuId} subMenuId={sub?.id} roleId={role?.id} permissionList={permissionList} />}
                    />
                </ListItem>
            )})}
        </List>
    </div>
  );
};

export default SubMenuList;