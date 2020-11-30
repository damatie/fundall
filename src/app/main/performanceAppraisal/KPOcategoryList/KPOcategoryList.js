import PageLayout from 'app/shared/pageLayout/PageLayout';
import withReducer from 'app/store/withReducer';
import React from 'react';
import KPOcategoryTable from './components/KPOcategoryTable';
import reducer from './store/reducers/categoryList.reducer';
import useKPOcategoryList from './hooks/useKPOcategoryList';
import KPOcategoryDialog from './components/KPOcategoryDialog';

const KPOcategoryList = () => {
  const { handleOpen } = useKPOcategoryList();
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
        <>
          <KPOcategoryTable/>
          <KPOcategoryDialog />
        </>
      }
    />
  );
};

export default withReducer('kpoCategory', reducer)(KPOcategoryList);