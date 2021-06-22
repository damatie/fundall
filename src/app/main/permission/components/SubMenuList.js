import React from 'react';
import {capitalizeWords} from '../../../shared/capitalizeWords';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PermissionList from './PermissionList';

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
    // console.log({mainMenuId});
    // console.log({subMenuId});
    // console.log({permission});'  
    const [permissionList, setPermissionList] = React.useState([]);

    // console.log({permissionList})
    React.useEffect(() => {
        setPermissionList(data.userPermission)
    }, [data]);

  return (
    <div>
        <List>
            {data.subMenu.filter( sub => sub.mainMenuId === mainMenuId).map((sub) => {
                return (
                <ListItem>
                    <ListItemText
                    id = {sub.id}
                    primary={capitalizeWords(sub.title)}
                    secondary={<PermissionList setPayload={setPayload} payload={payload} mainMenuId={mainMenuId} subMenuId={sub.id} roleId={role?.id} permissionList={permissionList} />}
                    />
                </ListItem>
            )})}
        </List>
    </div>
  );
};

export default SubMenuList;