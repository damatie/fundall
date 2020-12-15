import SharedModal from 'app/shared/modal/SharedModal';
import React from 'react';
import clsx from 'clsx';
import Moment from 'react-moment';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	table: {
		'& th': {
			padding: '16px 0'
		}
	}
});
const FolderDetails = (props) => {
    const classes = useStyles();
    
    const getAccess = () => {
        let access = props.roles.filter(role => props.folder.access.includes(role.id.toString())).map(role => role.name);
        if(access.length <= 0){
            return 'Everybody';
        }
        return access.toString().toUpperCase();
    }

  return (
      
    <SharedModal
      title={props.title}
      open={props.open}
      handleClose={props.handleCloseModal}
    >
      <table className={clsx(classes.table, 'w-full text-justify')}>
        <tbody>
            <tr className="name">
                <th>Folder Name</th>
                <td>
                    {props.folder ? props.folder.name : '' }
                </td>
            </tr>

            <tr className="description">
                <th>Description</th>
                <td>{props.folder ? props.folder.description : ''}</td>
            </tr>

            <tr className="access">
                <th>Access To</th>
                <td>{props.folder ? getAccess() : ''}</td>
            </tr>

            <tr className="createdBy">
                <th>Created By</th>
                <td>{props.folder ? props.folder.employee.firstName + ' ' + props.folder.employee.lastName : ''}</td>
            </tr>

            <tr className="created">
                <th>Created</th>
                <td>
                    {props.folder ? (
                        <Moment format="ddd Do MMM, YYYY | hh:mm:ss a">{props.folder.createdAt}</Moment>
                    ) : (
                        ''
                    )}{' '}
                </td>
            </tr>
            <tr className="updated">
                <th>Updated</th>
                <td>
                    {props.folder ? (
                        <Moment format="ddd Do MMM, YYYY | hh:mm:ss a">{props.folder.updatedAt}</Moment>
                    ) : (
                        ''
                    )}
                </td>
            </tr>
        </tbody>
    </table>
    </SharedModal>
  );
};

export default FolderDetails;