import SharedModal from 'app/shared/modal/SharedModal';
import React, {useEffect} from 'react';
import Input from 'app/shared/TextInput/Input';
import SharedButton from 'app/shared/button/SharedButton';
import DropZone from 'app/shared/sharedDropZone';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import CardMedia from '@material-ui/core/CardMedia';
import clsx from 'clsx';
import Icon from '@material-ui/core/Icon';
import SkeletonLoader from 'tiny-skeleton-loader-react';

const UpdateDocument = (props) => {
    const [name, setName] = React.useState('');
    const [file, setFile] = React.useState('');
    const [url, setUrl] = React.useState('');
    const classes = props.classes;
    
    const isVaild = () => {
        return (name === '');
    }

    const handleUpload = () =>{
        let payload = new FormData();
        payload.append("name", name);
        if(file.length > 0){
            payload.append("file", file[0], `${name.replaceAll(" ", "_")}_${moment(new Date()).format('DDMMYY')}.${file[0].name.split('.').pop()}`);
        }
        return payload;
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

    useEffect(() => {
        setName(props.name);
        setUrl(props.url);
    }, [props])

  return (
    <SharedModal
      title={props.title}
      open={(props.open)}
      handleClose={props.handleCloseModal}
    >
      <form>
        <Input
          id='name'
          name='name'
          label='Name'
          value={name}
          required
          className='my-16'
          onChange={ev => setName(ev.target.value)}
        />
        {url ? 
                getIcon(props.ext, url, name)
            :
            <SkeletonLoader height="300px" />
        }
        <Typography variant='body1' className="mt-16 mb-8">Document to upload *</Typography>
		<DropZone setValue={setFile}  allowedTypes='.pdf, .doc, .jpg, .png, .docx, .jpeg' allowMutliple={false}/>
        {(props.showProgress) ? 
            <div>
                <Box display="flex" alignItems="center">
                    <Box width="100%" mr={1}>
                        <LinearProgress variant="determinate" {...props} />
                    </Box>
                    <Box minWidth={35}>
                        <Typography variant="body2" color="textSecondary">{`${Math.round(
                        props.value,
                        )}%`}</Typography>
                    </Box>
                </Box>
            </div>
            :
            <div>
                <SharedButton
                    variant='contained'
                    color='primary'
                    type='button'
                    className='flex mx-auto'
                    disabled={isVaild()}
                    onClick={ev => {props.handleCreate(handleUpload())}}
                >
                Upload
                </SharedButton>
            </div>
        }
      </form>
    </SharedModal>
  );
};

export default UpdateDocument;