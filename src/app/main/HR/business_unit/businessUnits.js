import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from './store/reducers';
import BusinessUnitsHeader from './businessUnitsHeader';
import BusinessUnitsTable from './businessUnitsTables';

function BusinessUnits() {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<BusinessUnitsHeader />}
			content={<BusinessUnitsTable />}
			innerScroll
		/>
	);
}

export default withReducer('businessUnits', reducer)(BusinessUnits);
