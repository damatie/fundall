import React from 'react';
import EnhancedTable from 'app/shared/table/EnhancedTable';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import SharedModal from 'app/shared/modal/SharedModal';
import GradeAndPromotionForm from './components/GradeAndPromotionForm';

const GradeAndPromotion = () => {
  const columns = React.useMemo(
		() => [
			{
				Header: 'Job Title',
				accessor: 'jobTitle',
				// className: 'font-bold',
				sortable: true,
			},
			{
				Header: 'Duration',
				accessor: 'duration',
				// className: 'font-bold',
				sortable: true
      },
      {
				Header: 'Created by',
				accessor: 'createdBy',
				// className: 'font-bold',
				sortable: true
      },
		],
  );

  return (
    <>
    <Typography variant="subtitle1" color="initial" className='my-20'>
      <strong>Employee Date of Employment:</strong>&nbsp;<span>12/9/2019</span>
    </Typography>
    <Typography variant="subtitle1" color="initial" className='my-20'>
      <strong>Employee Confirmation Date:</strong>&nbsp;<span>12/9/2019</span>
    </Typography>
    <Typography variant="subtitle1" color="initial" className='my-20'>
      <strong>Employee Grade:</strong>&nbsp;<span>GL7</span>
    </Typography>
    <Typography variant="subtitle1" color="initial" className='my-20'>
      <strong>Employee Date of Last Promotion</strong>&nbsp;<span>12/9/2019</span>
    </Typography>
    <Typography variant="subtitle1" color="initial" className='my-20'>
      <strong>New Hire Or Rehire:</strong>&nbsp;<span>New Hire</span>
    </Typography>
    <EnhancedTable
			columns={columns}
			data={[]}
			onRowClick={(ev, row) => {
				if (row) {
					
				}
			}}
			checkbox={{
				showCheckbox: true,
				onClick: (value) => console.log(value),
				accessor: 'id',
			}}
			selectAll={(value) => console.log(value)}
      handleDelete={() => null}
      toolBar={
        <Grid container spacing={1}>
          <Grid item lg={9}/>
          <Grid item lg={3}>
            <Button
              variant="contained" 
              color="primary" 
              fullWidth
            >
              Add Promotion History
            </Button>
          </Grid>
        </Grid>
      }
		/>
    <SharedModal
      title='Add Promotion History'
      open={false}
      handleClose={() => null}
    >
      <GradeAndPromotionForm />
    </SharedModal>
    </>
  );
};

export default GradeAndPromotion;