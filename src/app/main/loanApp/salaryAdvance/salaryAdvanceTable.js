import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React, { useState, useEffect } from 'react';
import reducer from '../store/reducers';
import SalaryAdvanceHeader from './salaryAdvanceheader';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from '../store/actions';
import SharedTable from 'app/shared/sharedTable';
import { useHistory } from 'react-router';

const rows = [
	{
		id: 'amount',
		align: 'left',
		disablePadding: false,
		label: 'Amout requested',
    sort: true,
    field: 'amount'
  },
  {
		id: 'netSalary',
		align: 'left',
		disablePadding: false,
		label: 'Net salary',
    sort: true,
    field: 'netSalary'
  },
  {
		id: 'status',
		align: 'left',
		disablePadding: false,
		label: 'status',
    sort: true,
    field: 'status'
  },
];

const handleDelete = () => {

};


function SalaryAdvanceTable() {
  const dispatch = useDispatch();
  const salaryAdvanceLog = useSelector(({ salaryAdvance }) => salaryAdvance.salaryAdvances);
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(Actions.getSalaryAdvance());
  }, []);

  useEffect(() => {
    setData(salaryAdvanceLog.log)
	});

	const history = useHistory();
	
	const handleClick = n => {
		if(n.status === 'pending') {
			history.push(`/loan/request/salaryadvance_request/new/${n.id}`)
		} else {
			history.push(`/loan/review/salaryadvance/list/details/${n.id}`)
		}
	}
  
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<SalaryAdvanceHeader />}
			content={<SharedTable data={data} rows={rows} handleClick={handleClick} handleDelete={handleDelete} type='default'/>}
			innerScroll
		/>
	);
}

export default withReducer('salaryAdvance', reducer)(SalaryAdvanceTable);
