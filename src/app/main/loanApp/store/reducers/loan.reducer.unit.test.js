import reducer from './loan.reducer'
import * as types from '../actions'

describe('loan reducer', () => {

    const mockObjectData = {
        id: 0,
        amountRequested: 90,
        annualSalary: 9000
    };

    const mockData = [
        mockObjectData
    ];

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(
            {
                loading: true,
                loadings: false,
                success: false,
                error: false,
                data: {},
                updating: false,
                closing: false,
            }
        )
    });

    it('should handle LOAN_SUCCESS', () => {
        expect(reducer(
            {
                loading: true,
                loadings: false,
                success: false,
                error: false,
                data: {},
                updating: false,
                closing: false,
            },
            { type: types.LOAN_SUCCESS }
        )).toEqual(
            {
                loading: false,
                loadings: false,
                success: true,
                error: false,
                data: {},
                updating: false,
                closing: false,
            }
        )
    });

    it('should handle LOADING_LOAN', () => {
        expect(reducer(
            {
                loading: true,
                loadings: false,
                success: false,
                error: false,
                data: {},
                updating: false,
                closing: false,
            },
            { type: types.LOADING_LOAN }
        )).toEqual(
            {
                loading: true,
                loadings: true,
                success: false,
                error: false,
                data: {},
                updating: false,
                closing: false,
            }
        )
    });

    it('should handle LOAN_ERROR', () => {
        expect(reducer(
            {
                loading: true,
                loadings: false,
                success: false,
                error: false,
                data: {},
                updating: false,
                closing: false,
            },
            { type: types.LOAN_ERROR }
        )).toEqual(
            {
                loading: false,
                loadings: false,
                success: false,
                error: true,
                data: {},
                updating: false,
                closing: false,
            }
        )
    });

    it('should handle GET_LOAN', () => {
        expect(reducer(
            {
                loading: true,
                loadings: false,
                success: false,
                error: false,
                data: {},
                updating: false,
                closing: false,
            },
            { type: types.GET_LOAN, payload: mockObjectData }
        )).toEqual(
            {
                loading: false,
                loadings: false,
                success: false,
                error: false,
                data: mockObjectData,
                updating: false,
                closing: false,
            }
        )
    });

    it('should handle UPDATING_LOAN', () => {
        expect(reducer(
            {
                loading: true,
                loadings: false,
                success: false,
                error: false,
                data: {},
                updating: false,
                closing: false,
            },
            { type: types.UPDATING_LOAN }
        )).toEqual(
            {
                loading: true,
                loadings: false,
                success: false,
                error: false,
                data: {},
                updating: true,
                closing: false,
            }
        )
    });

    it('should handle UPDATE_SUCCESS', () => {
        expect(reducer(
            {
                loading: true,
                loadings: false,
                success: false,
                error: false,
                data: {},
                updating: false,
                closing: false,
            },
            { type: types.UPDATE_SUCCESS }
        )).toEqual(
            {
                loading: true,
                loadings: false,
                success: true,
                error: false,
                data: {},
                updating: false,
                closing: false,
            }
        )
    });

    it('should handle CLOSING_LOAN', () => {
        expect(reducer(
            {
                loading: true,
                loadings: false,
                success: false,
                error: false,
                data: {},
                updating: false,
                closing: false,
            },
            { type: types.CLOSING_LOAN }
        )).toEqual(
            {
                loading: true,
                loadings: false,
                success: false,
                error: false,
                data: {},
                updating: false,
                closing: true,
            }
        )
    });

    it('should handle CLOSED_SUCCESS', () => {
        expect(reducer(
            {
                loading: true,
                loadings: false,
                success: false,
                error: false,
                data: {},
                updating: false,
                closing: false,
            },
            { type: types.CLOSED_SUCCESS }
        )).toEqual(
            {
                loading: true,
                loadings: false,
                success: true,
                error: false,
                data: {},
                updating: false,
                closing: false,
            }
        )
    });

});