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
			button={{
				showButton: true,
				// btnTitle: 'Create KPO',
				// onClick: customHook.handleOpenModal,
				// btnComponent: false
				btnComponent:(
					<Button
						variant="contained"
						color="secondary"
						onClick={()=>console.log('modal opened')}
						// className={}
						startIcon={<AddIcon />}
					>
						Create Survey
					</Button>
				)
			}}
        >
			<Cards/>

        </PageLayout>
    )
}

export default index
