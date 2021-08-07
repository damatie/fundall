import EnhancedTable from 'app/shared/table/EnhancedTable';
import React from 'react';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import DownloadIcon from '@material-ui/icons/SaveAlt';
import SharedButton from 'app/shared/button/SharedButton';

const CandidatesTable = ({ customHook, search,  rows, showCheckBox }) => {

	const columns = React.useMemo(() => [
		{
			Header: 'Employee Name',
			accessor: 'applicantName',
			// className: 'font-bold',
			sortable: true,
			Cell: ({
				row: {
					original: { applicantName }
				}
			}) => {
				return <>{applicantName}</>;
			}
		},
		{
			Header: 'Email',
			accessor: 'applicantEmail',
			// className: 'font-bold',
			sortable: true,
			Cell: ({
				row: {
					original: { applicantEmail }
				}
			}) => {
				return <>{applicantEmail}</>;
			}
		},
		{
			Header: 'Job Tile',
			accessor: 'openPosition',
			// className: 'font-bold',
			sortable: true,
			Cell: ({
				row: {
					original: { openPosition }
				}
			}) => {
				return <>{openPosition?.jobTitle?.name}</>;
			}
		},
		{
			Header: 'Date Applied',
			accessor: 'dateApplied',
			// className: 'font-bold',
			sortable: true,
			Cell: ({
				row: {
					original: { dateApplied }
				}
			}) => {
				return <>{moment(dateApplied).format('DD-MM-YYYY')}</>;
			}
		},
		{
			Header: 'Home Address',
			accessor: 'homeAddress',
			sortable: true,
			Cell: ({
				row: {
					original: { homeAddress }
				}
			}) => {
				return <>{`${homeAddress}`}</>;
			}
		},
		{
			Header: 'Current Status',
			accessor: 'status',
			sortable: true,
			Cell: ({
				row: {
					original: { status }
				}
			}) => {
				return <>{status === 'ACTIVE' ? 'N/A': status}</>;
			}
		},
		// {
		// 	Header: '',
		// 	accessor: 'download',
		// 	// className: 'font-bold',
		// 	sortable: false,
		// 	Cell: ({ row: { 
		// 		original: { resume } 
		// 	} }) => {
		// 		return <>{
		// 			<SharedButton 
		// 				color="secondary" 
		// 				variant="contained"
		// 				className="my-10"
		// 				onClick={() => customHook.handleDownload(resume)}
		// 			>
		// 				<DownloadIcon fontSize="large"/>
		// 			</SharedButton>
		// 	  }</>;
		// 	}
		// }
	]);

	const { 
		handleDeleteRecruitment, 
		push,
		positionId,
		handleDownload,
		handleSelectShorted
	} = customHook;
	const data = rows

	return (
		<EnhancedTable
			columns={columns}
			data={data}
			onRowClick={(ev, row) => {
				// if (row && row.original.status !== 'rejected' && row.original.status !== 'requested') {
					// window.location = `/recruitment/${positionId}/candidate/${row.original.id}`;
					push(`/recruitment/${positionId}/candidate/${row.original.id}`);
				// }
			}}
			checkbox={{
				showCheckbox: showCheckBox,
				showDeleteIcon: false,
				onClick: value => console.log(value),
				handleCheckBox: handleSelectShorted,
				accessor: 'id'
			}}
			downloadButton={{
				show: true,
				handleDownload: handleDownload,
				accessor: 'resume'
			}}
			selectAll={value => console.log(value)}
			handleDelete={handleDeleteRecruitment}
		/>
	);
};

export default CandidatesTable;
