import _ from '@lodash';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';

const formList = [
  {
    id: 1,
    title: 'Acknowledegement of harassment-free workplace policy'
  },
  {
    id: 2,
    title: 'Acknowledgement of substance abuse standard for employees'
  },
  {
    id: 3,
    title: 'Authorization for payroll deductions'
  },
  {
    id: 4,
    title: 'Springrock driving and seat belt policy'
  },
  {
    id: 5,
    title: 'Employee handbook acknowledgement'
  },
  {
    id: 6,
    title: 'Authorization form for direct deposit of reimbursable expenses'
  },
  {
    id: 7,
    title: 'Business card request template'
  },
  {
    id: 8,
    title: 'Axa Mansard enrollment template'
  },
  {
    id: 9,
    title: 'Axa Mansard geriatrics health plan application'
  },
  {
    id: 10,
    title: 'Employee bank account information'
  },
  {
    id: 11,
    title: 'Employee data sheet'
  },
  {
    id: 12,
    title: 'Candidate evaluation form'
  },
  {
    id: 13,
    title: 'Employee loan application form'
  },
  {
    id: 14,
    title: 'Ethics and business conduct policy statement'
  },
  {
    id: 15,
    title: 'Exit interview'
  },
  {
    id: 16,
    title: 'ID card issuance form'
  },
  {
    id: 17,
    title: 'Information security policy'
  },
  {
    id: 18,
    title: 'Malaria program attestation'
  },
  {
    id: 19,
    title: 'Malarone/malanil acknowledgement form'
  },
  {
    id: 20,
    title: 'NHF individual registration form'
  },
  {
    id: 21,
    title: 'Non-Disclosure/confidentiality policy'
  },
  {
    id: 22,
    title: 'Operational advance form'
  },
  {
    id: 23,
    title: 'Operational expense report'
  },
  {
    id: 24,
    title: 'Pension bank account detail form'
  },
  {
    id: 25,
    title: 'Employee character reference form'
  },
  {
    id: 26,
    title: 'Reference details request form'
  },
  {
    id: 27,
    title: 'Salary Advance form'
  },
  {
    id: 28,
    title: 'Sim card acknowledgement form'
  },
  {
    id: 29,
    title: 'Mauritus template - foreign consultant'
  },
  {
    id: 30,
    title: 'Employee confirmation appraisal form'
  },
  {
    id: 31,
    title: 'Stanbic IBTC RSA form'
  },
  {
    id: 32,
    title: 'Timesheet template'
  },
  {
    id: 33,
    title: 'Training request form'
  }
];

const useStyles = makeStyles(theme => ({
  list: {
    margin: '1rem 0',
  },
  active: {
    background: 'linear-gradient(to right, #122230 0%, #192d3e 100%)',
    color: '#fff'
  }
}));                        

function LeftSideBar() {
  const classes = useStyles();
  const index = useSelector(({indexTab}) => indexTab.indexTab);
  const dispatch = useDispatch();
  

	return (
		<div>
			<List dense>
				{formList.map(data => (
					<ListItem key={data.id} button className={index.id === data.id ? `${classes.list} ${classes.active}` : classes.list} onClick={e => {
            dispatch(Actions.setTabIndex({id:data.id, title: data.title}))
            }}>
						<ListItemText primary={data.title} />
					</ListItem>
				))}
			</List>
		</div>
	);
}

export default React.memo(LeftSideBar);
