import { screen, render, } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import reducer from '../store/reducers/permission.reducer';
import VerticalTabs from '../components/VerticalTab';
import React from 'react';
import usePermission from '../hook/usePermission';

const initialState = {
  loading: true,
  loadingPermission: true,
  permissions: {},
  roles: [],
  submitting: false,
  id: '',
}

const endpoints = [
  {
    id: 1,
    name: 'Loan',
    endpoints: [
      {
        name: 'Get all Loan',
        path: '/loans',
        methods: [],
      },
    ]
  },
];

const state = {
  loading: false,
  loadingPermission: false,
  permissions: {
    endpoints: {
      '/loans': ['GET']
    }
  },
  roles: [{
    name: 'Hr manager',
    id: 1
  }],
  submitting: false,
  id: 1,
}

describe('Role and Permissions', () => {
  test('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  });
  
  test('allows you to update and create permissions', () => {
    const { result } = renderHook(() => usePermission({
      state,
      dispatch: (x) => null
    }));
    // update default permission with new permission
    act(() => {
      result.current.updateWithCurrentPermissions(endpoints[0].endpoints).map(item => {
        result.current.getInitialEndpoint(item);
      })
    });
  
    // submit permission
    act(() => {
      result.current.handleSubmit();
    });
  
    expect(result.current.submitValue).toEqual(state.permissions.endpoints);
  
    act(() => {
      result.current.getInitialEndpoint({
        name: 'Get all Loan',
        path: '/loans',
        methods: ['GET'],
      });
    })
  
    act(() => {
      result.current.updateInitialEndpoint(result.current.initialEndpoint[0])({
        target: {
          name: 'get',
          checked: false
        }
      })
    });
  
    act(() => {
      result.current.handleSubmit();
    });
  
    expect(result.current.submitValue).toEqual({
      '/loans': []
    });
  
    act(() => {
      result.current.updateInitialEndpoint(result.current.initialEndpoint[0])({
        target: {
          name: 'post',
          checked: true
        }
      });
    });
  
    act(() => {
      result.current.handleSubmit();
    });
  
    expect(result.current.submitValue).toEqual({
      '/loans': ['GET', 'POST']
    });
  });
  
  test('Should Contain Role in the Document', () => {
    render(
      <VerticalTabs 
        handleChange={() => null}
        roles={state.roles}
        index={0}
        loading={false}
      >
        <></>
      </VerticalTabs>
    );
  
    expect(screen.getByText(state.roles[0].name)).toBeInTheDocument();
  });
  
  test('Should not Contain Role in the Document', () => {
    render(
      <VerticalTabs 
        handleChange={() => null}
        roles={state.roles}
        index={0}
        loading={true}
      >
        <></>
      </VerticalTabs>
    );
  
    expect(screen.queryByText(state.roles[0].name)).not.toBeInTheDocument();
  });
});