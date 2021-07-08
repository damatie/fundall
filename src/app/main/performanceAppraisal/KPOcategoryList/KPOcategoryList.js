import PageLayout from 'app/shared/pageLayout/PageLayout';
import withReducer from 'app/store/withReducer';
import React from 'react';
import KPOcategoryTable from './components/KPOcategoryTable';
import reducer from './store/reducers/categoryList.reducer';
import useKPOcategoryList from './hooks/useKPOcategoryList';
import KPOcategoryDialog from './components/KPOcategoryDialog';
import Skeleton from '@material-ui/lab/Skeleton';

const KPOcategoryList = () => {
  const { handleOpen, loading } = useKPOcategoryList();
  return (
    <PageLayout
      header={{
        icon: '',
        title: 'KPO Category list',
        handleSearch: ({target: { value }}) => console.log(value),
      }}
      button={{
        showButton: true,
        btnTitle: 'Create category list',
        onClick: handleOpen('new')
      }}
      content={
        <div className='p-24'>
          {
            loading ? (
              <Skeleton variant="rect" width='100%' height={400} animation="wave"/>
            ) : (
              <>
                <KPOcategoryTable/>
                <KPOcategoryDialog />
              </>
            )
          }
          
        </div>
      }
    />
  );
};

export default withReducer('kpoCategory', reducer)(KPOcategoryList);