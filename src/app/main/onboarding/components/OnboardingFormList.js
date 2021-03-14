import _ from '@lodash';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import formList from '../formList';

const useStyles = makeStyles(theme => ({
  list: {
    margin: '1rem 0',
  },
  active: {
    background: 'linear-gradient(to right, #122230 0%, #192d3e 100%)',
    color: '#fff'
  }
}));                        

const OnboardingFormList = ({setTitle}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { formName, id } = useParams();

  const { push } = useHistory();

  const handleClick = (title) => () => {
    setTitle(title);
    if(!!id) {
      push(`/employee/onboarding/${title}/${id}`);
    } else {
      push(`/employee/onboarding/${title}`);
    }
  };
  
	return (
		<div>
			<List dense>
				{formList.map(data => (
					<ListItem key={data} button className={formName === data ? `${classes.list} ${classes.active}` : classes.list} onClick={handleClick(data)}>
						<ListItemText primary={data} />
					</ListItem>
				))}
			</List>
		</div>
	);
}

export default React.memo(OnboardingFormList);
