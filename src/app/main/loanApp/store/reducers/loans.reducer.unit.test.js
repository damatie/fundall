import reducer from './loans.reducer'
import * as types from '../actions'

describe("loans reducer", () => {

    const mockObjectData = {
        id: 0,
        amountRequested: 90,
        annualSalary: 9000
    };

    const mockData = [
        mockObjectData
    ];

    it("should return the initial state of the reducers: ", () => {
        expect(reducer(undefined, {})).toEqual({
            pendingLoan: [],
            approvedLoan: [],
            loanHistory: [],
            pendingLoanHistory: [],
            reviewedLoanHistory: [],
            rejectedLoanHistory: [],
            correctedLoanHistory: [],
            disbursedLoanHistory: [],
            approvedLoanHistory: [],
            closedLoanHistory: [],
            loading: false,
            openLoan: [],
            closedLoan: [],
            reviewedLoan: [],
            returnedLoan: [],
            disbursedLoan: []
        })
    });

    it("should handle GET_ALL_APPROVED_LOAN: ", () => {
        expect(reducer({
            pendingLoan: [],
            approvedLoan: [],
            loanHistory: [],
            pendingLoanHistory: [],
            reviewedLoanHistory: [],
            rejectedLoanHistory: [],
            correctedLoanHistory: [],
            disbursedLoanHistory: [],
            approvedLoanHistory: [],
            closedLoanHistory: [],
            loading: false,
            openLoan: [],
            closedLoan: [],
            reviewedLoan: [],
            returnedLoan: [],
            disbursedLoan: []
        },
            {
                type: types.GET_ALL_APPROVED_LOAN,
                payload: mockData
            }
        )).toEqual({
            pendingLoan: [],
            approvedLoan: mockData,
            loanHistory: [],
            pendingLoanHistory: [],
            reviewedLoanHistory: [],
            rejectedLoanHistory: [],
            correctedLoanHistory: [],
            disbursedLoanHistory: [],
            approvedLoanHistory: [],
            closedLoanHistory: [],
            loading: false,
            openLoan: [],
            closedLoan: [],
            reviewedLoan: [],
            returnedLoan: [],
            disbursedLoan: []
        })
    });

    it("should handle GET_ALL_PENDING_LOAN: ", () => {
        expect(reducer({
            pendingLoan: [],
            approvedLoan: [],
            loanHistory: [],
            pendingLoanHistory: [],
            reviewedLoanHistory: [],
            rejectedLoanHistory: [],
            correctedLoanHistory: [],
            disbursedLoanHistory: [],
            approvedLoanHistory: [],
            closedLoanHistory: [],
            loading: false,
            openLoan: [],
            closedLoan: [],
            reviewedLoan: [],
            returnedLoan: [],
            disbursedLoan: []
        },
            {
                type: types.GET_ALL_PENDING_LOAN,
                payload: mockData
            }
        )).toEqual({
            approvedLoan: [],
            pendingLoan: mockData,
            loanHistory: [],
            pendingLoanHistory: [],
            reviewedLoanHistory: [],
            rejectedLoanHistory: [],
            correctedLoanHistory: [],
            disbursedLoanHistory: [],
            approvedLoanHistory: [],
            closedLoanHistory: [],
            loading: false,
            openLoan: [],
            closedLoan: [],
            reviewedLoan: [],
            returnedLoan: [],
            disbursedLoan: []
        })
    });

    it("should handle GET_ALL_OPEN_LOAN: ", () => {
        expect(reducer({
            pendingLoan: [],
            approvedLoan: [],
            loanHistory: [],
            pendingLoanHistory: [],
            reviewedLoanHistory: [],
            rejectedLoanHistory: [],
            correctedLoanHistory: [],
            disbursedLoanHistory: [],
            approvedLoanHistory: [],
            closedLoanHistory: [],
            loading: false,
            openLoan: [],
            closedLoan: [],
            reviewedLoan: [],
            returnedLoan: [],
            disbursedLoan: []
        },
            {
                type: types.GET_ALL_OPEN_LOAN,
                payload: mockData
            }
        )).toEqual({
            approvedLoan: [],
            openLoan: mockData,
            loanHistory: [],
            pendingLoanHistory: [],
            reviewedLoanHistory: [],
            rejectedLoanHistory: [],
            correctedLoanHistory: [],
            disbursedLoanHistory: [],
            approvedLoanHistory: [],
            closedLoanHistory: [],
            loading: false,
            pendingLoan: [],
            closedLoan: [],
            reviewedLoan: [],
            returnedLoan: [],
            disbursedLoan: []
        })
    });

    it("should handle GET_RETURNED_LOAN: ", () => {
        expect(reducer({
            pendingLoan: [],
            approvedLoan: [],
            loanHistory: [],
            pendingLoanHistory: [],
            reviewedLoanHistory: [],
            rejectedLoanHistory: [],
            correctedLoanHistory: [],
            disbursedLoanHistory: [],
            approvedLoanHistory: [],
            closedLoanHistory: [],
            loading: false,
            openLoan: [],
            closedLoan: [],
            reviewedLoan: [],
            returnedLoan: [],
            disbursedLoan: []
        },
            {
                type: types.GET_RETURNED_LOAN,
                payload: mockData
            }
        )).toEqual({
            approvedLoan: [],
            returnedLoan: mockData,
            loanHistory: [],
            pendingLoanHistory: [],
            reviewedLoanHistory: [],
            rejectedLoanHistory: [],
            correctedLoanHistory: [],
            disbursedLoanHistory: [],
            approvedLoanHistory: [],
            closedLoanHistory: [],
            loading: false,
            pendingLoan: [],
            closedLoan: [],
            reviewedLoan: [],
            openLoan: [],
            disbursedLoan: []
        })
    });

    it("should handle GET_DISBURSED_LOAN: ", () => {
        expect(reducer({
            pendingLoan: [],
            approvedLoan: [],
            loanHistory: [],
            pendingLoanHistory: [],
            reviewedLoanHistory: [],
            rejectedLoanHistory: [],
            correctedLoanHistory: [],
            disbursedLoanHistory: [],
            approvedLoanHistory: [],
            closedLoanHistory: [],
            loading: false,
            openLoan: [],
            closedLoan: [],
            reviewedLoan: [],
            returnedLoan: [],
            disbursedLoan: []
        },
            {
                type: types.GET_DISBURSED_LOAN,
                payload: mockData
            }
        )).toEqual({
            approvedLoan: [],
            disbursedLoan: mockData,
            loanHistory: [],
            pendingLoanHistory: [],
            reviewedLoanHistory: [],
            rejectedLoanHistory: [],
            correctedLoanHistory: [],
            disbursedLoanHistory: [],
            approvedLoanHistory: [],
            closedLoanHistory: [],
            loading: false,
            pendingLoan: [],
            closedLoan: [],
            reviewedLoan: [],
            openLoan: [],
            returnedLoan: []
        })
    });

    it("should handle GET_ALL_CLOSED_LOAN: ", () => {
        expect(reducer({
            pendingLoan: [],
            approvedLoan: [],
            loanHistory: [],
            pendingLoanHistory: [],
            reviewedLoanHistory: [],
            rejectedLoanHistory: [],
            correctedLoanHistory: [],
            disbursedLoanHistory: [],
            approvedLoanHistory: [],
            closedLoanHistory: [],
            loading: false,
            openLoan: [],
            closedLoan: [],
            reviewedLoan: [],
            returnedLoan: [],
            disbursedLoan: []
        },
            {
                type: types.GET_ALL_CLOSED_LOAN,
                payload: mockData
            }
        )).toEqual({
            approvedLoan: [],
            closedLoan: mockData,
            loanHistory: [],
            pendingLoanHistory: [],
            reviewedLoanHistory: [],
            rejectedLoanHistory: [],
            correctedLoanHistory: [],
            disbursedLoanHistory: [],
            approvedLoanHistory: [],
            closedLoanHistory: [],
            loading: false,
            pendingLoan: [],
            disbursedLoan: [],
            reviewedLoan: [],
            openLoan: [],
            returnedLoan: []
        })
    });

    it("should handle EMPLOYEE_DISBURSED_LOAN_HISTORY: ", () => {
        expect(reducer({
            pendingLoan: [],
            approvedLoan: [],
            loanHistory: [],
            pendingLoanHistory: [],
            reviewedLoanHistory: [],
            rejectedLoanHistory: [],
            correctedLoanHistory: [],
            disbursedLoanHistory: [],
            approvedLoanHistory: [],
            closedLoanHistory: [],
            loading: false,
            openLoan: [],
            closedLoan: [],
            reviewedLoan: [],
            returnedLoan: [],
            disbursedLoan: []
        },
            {
                type: types.EMPLOYEE_DISBURSED_LOAN_HISTORY,
                payload: mockData
            }
        )).toEqual({
            approvedLoan: [],
            disbursedLoanHistory: mockData,
            loanHistory: [],
            pendingLoanHistory: [],
            reviewedLoanHistory: [],
            rejectedLoanHistory: [],
            correctedLoanHistory: [],
            closedLoan: [],
            approvedLoanHistory: [],
            closedLoanHistory: [],
            loading: false,
            pendingLoan: [],
            disbursedLoan: [],
            reviewedLoan: [],
            openLoan: [],
            returnedLoan: []
        })
    });

    it("should handle EMPLOYEE_CORRECTED_LOAN_HISTORY: ", () => {
        expect(reducer({
            pendingLoan: [],
            approvedLoan: [],
            loanHistory: [],
            pendingLoanHistory: [],
            reviewedLoanHistory: [],
            rejectedLoanHistory: [],
            correctedLoanHistory: [],
            disbursedLoanHistory: [],
            approvedLoanHistory: [],
            closedLoanHistory: [],
            loading: false,
            openLoan: [],
            closedLoan: [],
            reviewedLoan: [],
            returnedLoan: [],
            disbursedLoan: []
        },
            {
                type: types.EMPLOYEE_CORRECTED_LOAN_HISTORY,
                payload: mockData
            }
        )).toEqual({
            approvedLoan: [],
            correctedLoanHistory: mockData,
            loanHistory: [],
            pendingLoanHistory: [],
            reviewedLoanHistory: [],
            rejectedLoanHistory: [],
            disbursedLoanHistory: [],
            closedLoan: [],
            approvedLoanHistory: [],
            closedLoanHistory: [],
            loading: false,
            pendingLoan: [],
            disbursedLoan: [],
            reviewedLoan: [],
            openLoan: [],
            returnedLoan: []
        })
    });

    it("should handle EMPLOYEE_REVIEWED_LOAN_HISTORY: ", () => {
        expect(reducer({
            pendingLoan: [],
            approvedLoan: [],
            loanHistory: [],
            pendingLoanHistory: [],
            reviewedLoanHistory: [],
            rejectedLoanHistory: [],
            correctedLoanHistory: [],
            disbursedLoanHistory: [],
            approvedLoanHistory: [],
            closedLoanHistory: [],
            loading: false,
            openLoan: [],
            closedLoan: [],
            reviewedLoan: [],
            returnedLoan: [],
            disbursedLoan: []
        },
            {
                type: types.EMPLOYEE_REVIEWED_LOAN_HISTORY,
                payload: mockData
            }
        )).toEqual({
            approvedLoan: [],
            reviewedLoanHistory: mockData,
            loanHistory: [],
            pendingLoanHistory: [],
            correctedLoanHistory: [],
            rejectedLoanHistory: [],
            disbursedLoanHistory: [],
            closedLoan: [],
            approvedLoanHistory: [],
            closedLoanHistory: [],
            loading: false,
            pendingLoan: [],
            disbursedLoan: [],
            reviewedLoan: [],
            openLoan: [],
            returnedLoan: []
        })
    });

    it("should handle EMPLOYEE_PENDING_LOAN_HISTORY: ", () => {
        expect(reducer({
            pendingLoan: [],
            approvedLoan: [],
            loanHistory: [],
            pendingLoanHistory: [],
            reviewedLoanHistory: [],
            rejectedLoanHistory: [],
            correctedLoanHistory: [],
            disbursedLoanHistory: [],
            approvedLoanHistory: [],
            closedLoanHistory: [],
            loading: false,
            openLoan: [],
            closedLoan: [],
            reviewedLoan: [],
            returnedLoan: [],
            disbursedLoan: []
        },
            {
                type: types.EMPLOYEE_PENDING_LOAN_HISTORY,
                payload: mockData
            }
        )).toEqual({
            approvedLoan: [],
            pendingLoanHistory: mockData,
            loanHistory: [],
            reviewedLoanHistory: [],
            correctedLoanHistory: [],
            rejectedLoanHistory: [],
            disbursedLoanHistory: [],
            closedLoan: [],
            approvedLoanHistory: [],
            closedLoanHistory: [],
            loading: false,
            pendingLoan: [],
            disbursedLoan: [],
            reviewedLoan: [],
            openLoan: [],
            returnedLoan: []
        })
    });

    it("should handle EMPLOYEE_REJECTED_LOAN_HISTORY: ", () => {
        expect(reducer({
            pendingLoan: [],
            approvedLoan: [],
            loanHistory: [],
            pendingLoanHistory: [],
            reviewedLoanHistory: [],
            rejectedLoanHistory: [],
            correctedLoanHistory: [],
            disbursedLoanHistory: [],
            approvedLoanHistory: [],
            closedLoanHistory: [],
            loading: false,
            openLoan: [],
            closedLoan: [],
            reviewedLoan: [],
            returnedLoan: [],
            disbursedLoan: []
        },
            {
                type: types.EMPLOYEE_REJECTED_LOAN_HISTORY,
                payload: mockData
            }
        )).toEqual({
            approvedLoan: [],
            rejectedLoanHistory: mockData,
            loanHistory: [],
            reviewedLoanHistory: [],
            correctedLoanHistory: [],
            pendingLoanHistory: [],
            disbursedLoanHistory: [],
            closedLoan: [],
            approvedLoanHistory: [],
            closedLoanHistory: [],
            loading: false,
            pendingLoan: [],
            disbursedLoan: [],
            reviewedLoan: [],
            openLoan: [],
            returnedLoan: []
        })
    });

    it("should handle EMPLOYEE_APPROVED_LOAN_HISTORY: ", () => {
        expect(reducer({
            pendingLoan: [],
            approvedLoan: [],
            loanHistory: [],
            pendingLoanHistory: [],
            reviewedLoanHistory: [],
            rejectedLoanHistory: [],
            correctedLoanHistory: [],
            disbursedLoanHistory: [],
            approvedLoanHistory: [],
            closedLoanHistory: [],
            loading: false,
            openLoan: [],
            closedLoan: [],
            reviewedLoan: [],
            returnedLoan: [],
            disbursedLoan: []
        },
            {
                type: types.EMPLOYEE_APPROVED_LOAN_HISTORY,
                payload: mockData
            }
        )).toEqual({
            approvedLoan: [],
            approvedLoanHistory: mockData,
            loanHistory: [],
            reviewedLoanHistory: [],
            correctedLoanHistory: [],
            pendingLoanHistory: [],
            disbursedLoanHistory: [],
            closedLoan: [],
            rejectedLoanHistory: [],
            closedLoanHistory: [],
            loading: false,
            pendingLoan: [],
            disbursedLoan: [],
            reviewedLoan: [],
            openLoan: [],
            returnedLoan: []
        })
    });

    it("should handle EMPLOYEE_CLOSED_LOAN_HISTORY: ", () => {
        expect(reducer({
            pendingLoan: [],
            approvedLoan: [],
            loanHistory: [],
            pendingLoanHistory: [],
            reviewedLoanHistory: [],
            rejectedLoanHistory: [],
            correctedLoanHistory: [],
            disbursedLoanHistory: [],
            approvedLoanHistory: [],
            closedLoanHistory: [],
            loading: false,
            openLoan: [],
            closedLoan: [],
            reviewedLoan: [],
            returnedLoan: [],
            disbursedLoan: []
        },
            {
                type: types.EMPLOYEE_CLOSED_LOAN_HISTORY,
                payload: mockData
            }
        )).toEqual({
            approvedLoan: [],
            closedLoanHistory: mockData,
            loanHistory: [],
            reviewedLoanHistory: [],
            correctedLoanHistory: [],
            pendingLoanHistory: [],
            disbursedLoanHistory: [],
            closedLoan: [],
            rejectedLoanHistory: [],
            approvedLoanHistory: [],
            loading: false,
            pendingLoan: [],
            disbursedLoan: [],
            reviewedLoan: [],
            openLoan: [],
            returnedLoan: []
        })
    });

    it("should handle GET_ALL_REVIEWED_LOAN: ", () => {
        expect(reducer({
            pendingLoan: [],
            approvedLoan: [],
            loanHistory: [],
            pendingLoanHistory: [],
            reviewedLoanHistory: [],
            rejectedLoanHistory: [],
            correctedLoanHistory: [],
            disbursedLoanHistory: [],
            approvedLoanHistory: [],
            closedLoanHistory: [],
            loading: false,
            openLoan: [],
            closedLoan: [],
            reviewedLoan: [],
            returnedLoan: [],
            disbursedLoan: []
        },
            {
                type: types.GET_ALL_REVIEWED_LOAN,
                payload: mockData
            }
        )).toEqual({
            approvedLoan: [],
            reviewedLoan: mockData,
            loanHistory: [],
            reviewedLoanHistory: [],
            correctedLoanHistory: [],
            pendingLoanHistory: [],
            disbursedLoanHistory: [],
            closedLoan: [],
            rejectedLoanHistory: [],
            approvedLoanHistory: [],
            loading: false,
            pendingLoan: [],
            disbursedLoan: [],
            closedLoanHistory: [],
            openLoan: [],
            returnedLoan: []
        })
    });

    it("should handle LOADING_LOANS: ", () => {
        expect(reducer({
            pendingLoan: [],
            approvedLoan: [],
            loanHistory: [],
            pendingLoanHistory: [],
            reviewedLoanHistory: [],
            rejectedLoanHistory: [],
            correctedLoanHistory: [],
            disbursedLoanHistory: [],
            approvedLoanHistory: [],
            closedLoanHistory: [],
            loading: false,
            openLoan: [],
            closedLoan: [],
            reviewedLoan: [],
            returnedLoan: [],
            disbursedLoan: []
        },
            {
                type: types.LOADING_LOANS,
                payload: mockData
            }
        )).toEqual({
            pendingLoan: [],
            approvedLoan: [],
            loanHistory: [],
            pendingLoanHistory: [],
            reviewedLoanHistory: [],
            rejectedLoanHistory: [],
            correctedLoanHistory: [],
            disbursedLoanHistory: [],
            approvedLoanHistory: [],
            closedLoanHistory: [],
            loading: true,
            openLoan: [],
            closedLoan: [],
            reviewedLoan: [],
            returnedLoan: [],
            disbursedLoan: []
        })
    });

})