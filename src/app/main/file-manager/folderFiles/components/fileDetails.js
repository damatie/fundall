import SharedModal from 'app/shared/modal/SharedModal';
import React from 'react';
import clsx from 'clsx';
import Moment from 'react-moment';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Icon from '@material-ui/core/Icon';
import SkeletonLoader from 'tiny-skeleton-loader-react';

const FileDetails = (props) => {
    const classes = props.classes;
    
    const getAccess = () => {
        let access = props.roles.filter(role => props.file.documentSubFolder.access.includes(role.id.toString())).map(role => role.name);
        if(access.length <= 0){
            return 'Everybody';
        }
        return access.toString().toUpperCase();
    }

    function getIcon(ext, url, title){
		switch (ext) {
			case 'image':
				return (
					<div>
						<CardMedia className={classes.media} image={url} title={title} />
					</div>
				);
				break;
			case 'pdf':
				return (
					<div>
                        <CardMedia className={classes.media} image="https://www.pngkey.com/png/detail/98-981538_icono-pdf-vector-pdf-icon-free.png" title={title} />
					</div>
				);
				break;
			case 'document':
				return (
					
					<div>
                        <CardMedia className={classes.media} image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQrQbDWK6KryJ73eQehYkeqBzfHns7DL-WCmQ&usqp=CAU" title={title} />
					</div>
				);
				break;
			case 'spreadsheet':
				return (
					<div>
                        <CardMedia className={classes.media} image="https://www.vhv.rs/dpng/d/33-338244_microsoft-excel-logo-hd-png-download.png" title={title} />
					</div>
				);
				break;

			default:
				return (
					<div>
						<Icon className={clsx(classes.typeIcon, ext, 'text-48')} />
					</div>
				);
				break;
		}
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
                <th>file Name</th>
                <td>
                    {props.file ? `${props.file.name}.${props.file.url.split('.').pop()}` : '' }
                </td>
            </tr>

            <tr className="icon">
                <th>File</th>
                <td>
                    {props.file ? getIcon(props.getExt(props.file.url), props.file.url, props.file.name) : '' }
                </td>
            </tr>

            <tr className="size">
                <th>Size</th>
                <td>{props.file ? props.formatBytes(props.file.size) : ''}</td>
            </tr>

            <tr className="type">
                <th>type</th>
                <td>{props.file ? props.file.type : ''}</td>
            </tr>

            <tr className="access">
                <th>Access To</th>
                <td>{props.file ? getAccess() : ''}</td>
            </tr>

            <tr className="uploadedBy">
                <th>Uploaded By</th>
                <td>{props.file ? props.file.employee.firstName + ' ' + props.file.employee.lastName : ''}</td>
            </tr>

            <tr className="uploaded">
                <th>Uploaded</th>
                <td>
                    {props.file ? (
                        <Moment format="ddd Do MMM, YYYY | hh:mm:ss a">{props.file.modifiedAt}</Moment>
                    ) : (
                        ''
                    )}{' '}
                </td>
            </tr>
        </tbody>
    </table>
    </SharedModal>
  );
};

export default FileDetails;