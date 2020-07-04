import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from './store/reducers';
import ResourcesHeader from './resourceHeader';
import ResourcesTable from './resourceTable';

function Resources() {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<ResourcesHeader />}
			content={<ResourcesTable />}
			innerScroll
		/>
	);
}

export default withReducer('resources', reducer)(Resources);