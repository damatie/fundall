import React from 'react';
import PageLayout from 'app/shared/pageLayout/PageLayout';
import withReducer from 'app/store/withReducer';
import Skeleton from '@material-ui/lab/Skeleton';
import EnhancedTable from 'app/shared/table/EnhancedTable';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import SharedModal from 'app/shared/modal/SharedModal';
import CompensationColumnsForm from './components/CompensationColumnsForm';
import reducer from './store/reducer/compensation.reducer';
import { getCompensationColumns } from './store/actions';
import useCompensationColumns from './hooks/useCompensationColumns';

const CompensationColumns = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getCompensationColumns());
  }, []);

  const { 
    loading,
    data,
    open,
    details,
    type,
  } = useSelector(state => state.compensationColumns)
  const columns = React.useMemo(() =>
    [
      {
        Header: 'Column Name',
        accessor: 'columnName',
        sortable: true,
      },
      {
        Header: 'Creation Date',
        accessor: 'createdAt',
        sortable: true,
        Cell: ({ row: { original } }) => {
          return <>{moment(original.createdAt).format('LLL')}</>
        }
      },
      {
        Header: 'Last Modification',
        accessor: 'updatedAt',
        sortable: true,
        Cell: ({ row: { original } }) => {
          return <>{moment(original.updatedAt).format('LLL')}</>
        }
      },
  ]);

  const {
    handleClose,
    handleOpen,
    getCompensationColumDetails,
    onSubmit,
    handleDelete,
    errors,
    handleSubmit,
    register,
  } = useCompensationColumns({
    dispatch,
    state: {
      type,
      details,
    }
  })
  
  return (
    <PageLayout
      button={{
        showButton: true,
        btnTitle: 'Create',
        onClick: handleOpen,
      }}
      header={{
        title: 'Compensation Columns',
        handleSearch: (ev) => console.log(ev)
      }}
      content={
        <div className='p-24'>
          {
            loading ? (
              <Skeleton variant="rect" width='100%' height={400} animation="wave" />
            ) : (
                <EnhancedTable
                  columns={columns}
                  data={data}
                  onRowClick={(ev, row) => {
                    if (row) {
                      getCompensationColumDetails(row.original);
                    }
                  }}
                  checkbox={{
                    showCheckbox: true,
                    onClick: (value) => console.log(value),
                    accessor: 'id',
                  }}
                  selectAll={(value) => console.log(value)}
                  handleDelete={handleDelete}
                />
              )
          }
          <SharedModal
            open={open}
            title={type === 'new' ? 'Create Compensation Column' : 'Compensation Column Details'}
            handleClose={handleClose}
          >
            <CompensationColumnsForm
              form={{
                onSubmit,
                errors,
                handleSubmit,
                register,
              }}
              details={details}
            />
          </SharedModal>
        </div>
      }
    />
  );
};

export default withReducer('compensationColumns', reducer)(CompensationColumns);