
import { renderHook } from '@testing-library/react-hooks';
import { act, render, fireEvent } from '@testing-library/react';
import useEmployeeGrade from '../hooks/useEmployeeGrade';
import EmployeeGradeModal from '../components/EmployeeGradeModal';
import React from 'react';
import configureMockStore from 'redux-mock-store';
// import { act } from 'react-dom/test-utils';
import thunk from 'redux-thunk'

const state = {
  open: true,
  data: [],
  signleData: [],
  loading: true,
  type: 'new'
}
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const store = mockStore(state)

describe("Employee Grade", () => {
  const customHook = renderHook(() => useEmployeeGrade(state, store.dispatch));

  describe("with valid inputs", () => {
    it('calls the onSubmit function', async () => {
      const { getByLabelText, getByTestId, getByText } = render(<EmployeeGradeModal customHook={customHook.result.current}/>);

      await act( async () => {
        fireEvent.change(getByLabelText('Name'), { target: { value: 'test'}});
        fireEvent.change(getByLabelText('Description'), { target: { value: 'test'}});
        customHook.result.current.register({
          name: 'pip',
          value: false
        })
      });

      await act( async () => {
        fireEvent.click(getByTestId("button"));
      });

      console.log(customHook.result.current.getValues)

      expect(Object.entries(customHook.result.current.errors).length).toBe(0);
    })
  })
})