const { default: userRole } = require("utils/userRole")

const userPermission = ({role, userId, profileId}) => {
  const canEdit = () => {
    return userRole(role) === 'hrmanager' || userId == profileId;
  };

  const employee = userId === profileId;

  const canAdd = () => {
    return employee;
  };

  const canView = () => {
    canEdit();
  }

  const canDelete = () => {
    return employee;
  };

  const editCompensation = () => {
    return userRole(role) === 'financemanager';
  }

  const canEditOrganization = () => {
    return userRole(role) === 'hrmanager' 
  }


  return { canEdit, canAdd, canView, canDelete, editCompensation, canEditOrganization }
};

export default userPermission;