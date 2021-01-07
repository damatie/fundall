import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from './store/reducers';
import DepartmentTable from './departmentTable';
import Button from '@material-ui/core/Button';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { useParams, Link } from 'react-router-dom';

function Departments() {
  const params = useParams();
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={
        <div className='m-8 flex flex-1 w-full items-center justify-between'>
          <div></div>
          <FuseAnimate animation="transition.slideRightIn" delay={300}>
            <Button
              component={Link}
              to={`/hr/business_unit/details/${params.id}/department/new/`}
              className="whitespace-no-wrap normal-case"
              variant="contained"
              color="secondary"
            >New Department</Button>
          </FuseAnimate>
          
        </div>
      }
			content={
        <FuseAnimate animation="transition.slideTopIn" delay={300}>
          <DepartmentTable />
        </FuseAnimate>
      }
			innerScroll
		/>
	);
}

export default withReducer('departmentsList', reducer)(Departments);
