import React, { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import ProgressBtn from '../../../../shared/progressBtn';
import UserAvatar from '../../userAvatar';

const useStyles = makeStyles((theme) => ({
  textarea: {
    border: 'solid grey',
    minHeight: 150,
    padding: theme.spacing(1),
    width: '100%',
    fontSize: 16,
  },
  employeeCard: {
    border: '1px rgba(0, 0, 0, 0.12) solid',
    borderRadius: theme.spacing(.8),
    maxWidth: 350,
    height: 250,
    background: '#fff',
    padding: theme.spacing(2),
    overflow: 'scroll',
  },
  user: {
    marginBottom: theme.spacing(2),
    width: '100%',
  },
  hide: {
    display: 'none',
  },
}));

function BlogCommentInput(props) {
  const classes = useStyles();
  const [content, setContent] = useState('');
  const employees = useSelector(state => state.blog.showEmployeeModal.data.map(employee => employee));

  useEffect(() => {
    props.onChange(content);
  }, [content])

  const employeeInfo = employees.map((employee, i) => {
    const fullName = `${employee.lastName} ${employee.firstName}`;
    return (
      <button className={classes.user} key={i} onClick={() => setContent(content => `${content}${fullName}`)}>
        <UserAvatar
          fullName={fullName}
          src={employee.profilePicture}
          size='32px'
          display="block"
        />
      </button>
    )
  })
  
  return (
    <>
      <div className={!props.showDialog ? classes.hide : classes.employeeCard}>
        { employeeInfo }
      </div>
      <textarea
        placeholder="Add to the discussion"
        value={props.value}
        onChange={event => setContent(event.target.value)}
        className={classes.textarea}
      />
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        { props.cancel && 
          <Button onClick={() => props.onChange(true)}>
            {props.cancel}
          </Button>
        }
        <ProgressBtn content='Submit' onClick={() => props.onClick()} />
      </div>
    </>
  )
}

export default BlogCommentInput;
