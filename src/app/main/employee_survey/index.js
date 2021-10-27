import React from 'react'
import PageLayout from 'app/shared/pageLayout/PageLayout'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Cards from 'app/shared/cards/cards'


const index = () => {

    return (
        <PageLayout
            header={{
				icon: '',
				title: 'Employee Survey',
				handleSearch: ({ target: { value } }) => console.log(value)
			}}
			button = {{
				showButton: true,
				btnComponent:(
					<Button
						variant="contained"
						color="secondary"
						onClick={()=>console.log('modal opened')}
						startIcon={<AddIcon />}
					>
						Create Survey
					</Button>
				)
			}}
			content={
				<div className="w-4/12">
					<Cards className="p-10 bg-white">
						Hi
					</Cards>
				</div>
			}
        />
    )
}

export default index
