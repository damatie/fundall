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


  return { canEdit, canAdd, canView, canDelete, editCompensation }
};

export default userPermission;