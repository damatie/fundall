import React from 'react';
import { Typography, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

// Components
import Card from './card';

const tableData = [
	{
		name: 'Entity 1',
		noOfDepartments: 2,
		employeeCode: 'ENT',
		address: '4997 Elkview Drive'
	},
	{
		name: 'Entity 2',
		noOfDepartments: 4,
		employeeCode: 'ENT',
		address: '4997 Elkview Drive'
	},
	{
		name: 'Entity 3',
		noOfDepartments: 2,
		employeeCode: 'ENT',
		address: '4997 Elkview Drive'
	},
	{
		name: 'Entity 4',
		noOfDepartments: 4,
		employeeCode: 'ENT',
		address: '4997 Elkview Drive'
	}
];

const EntityTable = () => {
	return (
		<Card>
			<div className="mb-15 ml-10">
				<Typography variant="h5">Entities</Typography>
			</div>
			<Table style={{ width: '100%' }}>
				<TableHead>
					<TableRow>
						<TableCell className="py-40">Entity Name</TableCell>
						<TableCell className="py-40">Number of Departments</TableCell>
						<TableCell className="py-40">Employee Code</TableCell>
						<TableCell className="py-40">Address</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{tableData.map(({ name, noOfDepartments, employeeCode, address }) => (
						<TableRow key={name}>
							<TableCell className="py-40">{name}</TableCell>
							<TableCell className="py-40">{noOfDepartments}</TableCell>
							<TableCell className="py-40">{employeeCode}</TableCell>
							<TableCell className="py-40">{address}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Card>
	);
};

export default EntityTable;
