import React from 'react';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PermissionCheckbox from '../components/PermissionCheckbox';

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

const getPermission = (item, list, mainMenuId, subMenuId, roleId = 1) => {
    try{
        const permission = list.find( per => per?.mainMenuId === mainMenuId && per?.subMenuId === subMenuId && per?.roleId === roleId);
        return permission[item.id];
    }catch(e){
        return false;
    }
}

const PermissionList = ({
    setPayload,
    payload,
    mainMenuId,
    subMenuId,
    roleId,
    permissionList
}) => {
  return (
    // <section className='my-16'>
    <div>
      <FormGroup row>
        {
          permissions.map(item => (
            <PermissionCheckbox setPayload={setPayload} payload={payload} mainMenuId={mainMenuId} subMenuId={subMenuId} roleId={roleId || 1} id={item.id} name={item.name} checked={getPermission(item, permissionList, mainMenuId,subMenuId,roleId)}/>
          ))
        }
      </FormGroup>
      </div>
    // </section>
  );
};

export default PermissionList;