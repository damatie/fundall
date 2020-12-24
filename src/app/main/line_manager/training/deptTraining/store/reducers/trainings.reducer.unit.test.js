import reducer from './trainings.reducer'
import * as types from '../actions'

describe('trainings reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(
            {
                loading: true,
                totalTrainings: [],
                approvedTrainings: [],
                rejectedTrainings: [],
                pendingTrainings: [],
                completedTrainings: [],
                reviewedTrainings: [],
                success: false
            }
        )
    })

    it('should handle a valid LOADING_TRAINIING data', () => {
        expect(
            reducer(
                {
                    loading: true,
                    totalTrainings: [],
                    approvedTrainings: [],
                    rejectedTrainings: [],
                    pendingTrainings: [],
                    completedTrainings: [],
                    reviewedTrainings: [],
                    success: false
                },
                {
                    type: types.LOADING_TRAINIING,
                }
            )
        ).toEqual(
            {
                loading: true,
                totalTrainings: [],
                approvedTrainings: [],
                rejectedTrainings: [],
                pendingTrainings: [],
                completedTrainings: [],
                reviewedTrainings: [],
                success: false
            }
        )
    })

    it('should handle a valid GET_APPROVED_TRAINING data', () => {
        expect(
            reducer(
                {
                    loading: true,
                    totalTrainings: [],
                    approvedTrainings: [],
                    rejectedTrainings: [],
                    pendingTrainings: [],
                    completedTrainings: [],
                    reviewedTrainings: [],
                    success: false
                },
                {
                    type: types.GET_APPROVED_TRAINING,
                    payload: [
                        {
                            id: "892839820"
                        }
                    ]
                }
            )
        ).toEqual(
            {
                loading: false,
                totalTrainings: [],
                approvedTrainings: [
                    {
                        id: "892839820"
                    }
                ],
                rejectedTrainings: [],
                pendingTrainings: [],
                completedTrainings: [],
                reviewedTrainings: [],
                success: false
            }
        )
    })

    it('should handle a valid GET_REJECTED_TRAINING data', () => {
        expect(
            reducer(
                {
                    loading: true,
                    totalTrainings: [],
                    approvedTrainings: [],
                    rejectedTrainings: [],
                    pendingTrainings: [],
                    completedTrainings: [],
                    reviewedTrainings: [],
                    success: false
                },
                {
                    type: types.GET_REJECTED_TRAINING,
                    payload: [
                        {
                            id: "892839820"
                        }
                    ]
                }
            )
        ).toEqual(
            {
                loading: false,
                totalTrainings: [],
                approvedTrainings: [],
                rejectedTrainings: [
                    {
                        id: "892839820"
                    }
                ],
                pendingTrainings: [],
                completedTrainings: [],
                reviewedTrainings: [],
                success: false
            }
        )
    });

    it('should handle a valid GET_PENDING_TRAINING data', () => {
        expect(
            reducer(
                {
                    loading: true,
                    totalTrainings: [],
                    approvedTrainings: [],
                    rejectedTrainings: [],
                    pendingTrainings: [],
                    completedTrainings: [],
                    reviewedTrainings: [],
                    success: false
                },
                {
                    type: types.GET_PENDING_TRAINING,
                    payload: [
                        {
                            id: "892839820"
                        }
                    ]
                }
            )
        ).toEqual(
            {
                loading: false,
                totalTrainings: [],
                approvedTrainings: [],
                rejectedTrainings: [],
                pendingTrainings: [
                    {
                        id: "892839820"
                    }
                ],
                completedTrainings: [],
                reviewedTrainings: [],
                success: false
            }
        )
    });

    it('should handle a valid GET_COMPLETED_TRAINING data', () => {
        expect(
            reducer(
                {
                    loading: true,
                    totalTrainings: [],
                    approvedTrainings: [],
                    rejectedTrainings: [],
                    pendingTrainings: [],
                    completedTrainings: [],
                    reviewedTrainings: [],
                    success: false
                },
                {
                    type: types.GET_COMPLETED_TRAINING,
                    payload: [
                        {
                            id: "892839820"
                        }
                    ]
                }
            )
        ).toEqual(
            {
                loading: false,
                totalTrainings: [],
                approvedTrainings: [],
                rejectedTrainings: [],
                pendingTrainings: [],
                completedTrainings: [
                    {
                        id: "892839820"
                    }
                ],
                reviewedTrainings: [],
                success: false
            }
        )
    });

    it('should handle a valid GET_REVIEWED_TRAINING data', () => {
        expect(
            reducer(
                {
                    loading: true,
                    totalTrainings: [],
                    approvedTrainings: [],
                    rejectedTrainings: [],
                    pendingTrainings: [],
                    completedTrainings: [],
                    reviewedTrainings: [],
                    success: false
                },
                {
                    type: types.GET_REVIEWED_TRAINING,
                    payload: [
                        {
                            id: "892839820"
                        }
                    ]
                }
            )
        ).toEqual(
            {
                loading: false,
                totalTrainings: [],
                approvedTrainings: [],
                rejectedTrainings: [],
                pendingTrainings: [],
                completedTrainings: [],
                reviewedTrainings: [
                    {
                        id: "892839820"
                    }
                ],
                success: false
            }
        )
    });

})