import reducer from './trainings.reducer'
import * as types from '../actions'

describe('trainings reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(
            {
                loading: true,
                data: [],
                pendingTrainings: [],
                approvedTrainings: [],
                completedTrainings: [],
                rejectedTrainings: [],
                pendingPersonalTrainings: [],
                reviewedPersonalTrainings: [],
                approvedPersonalTrainings: [],
                completedPersonalTrainings: [],
                rejectedPersonalTrainings: [],
                events: [],
                trainings: [],
                entities: [],
                department: [],
                roles: [],
                success: false
            }
        )
    })

    it('should handle a valid CREATE_TRAINING_SUCCESS data', () => {
        expect(
            reducer(
                {
                    data: [],
                    pendingTrainings: [],
                    approvedTrainings: [],
                    completedTrainings: [],
                    rejectedTrainings: [],
                    pendingPersonalTrainings: [],
                    reviewedPersonalTrainings: [],
                    approvedPersonalTrainings: [],
                    completedPersonalTrainings: [],
                    rejectedPersonalTrainings: [],
                    events: [],
                    trainings: [],
                    entities: [],
                    department: [],
                    roles: [],
                    success: false,
                    loading: true
                },
                {
                    type: types.CREATE_TRAINING_SUCCESS,
                }
            )
        ).toEqual(
            {
                data: [],
                pendingTrainings: [],
                approvedTrainings: [],
                completedTrainings: [],
                rejectedTrainings: [],
                pendingPersonalTrainings: [],
                reviewedPersonalTrainings: [],
                approvedPersonalTrainings: [],
                completedPersonalTrainings: [],
                rejectedPersonalTrainings: [],
                events: [],
                trainings: [],
                entities: [],
                department: [],
                roles: [],
                success: true,
                loading: false
            }
        )
    })

    it('should handle a valid CREATE_TRAINING_ERROR data', () => {
        expect(
            reducer(
                {
                    data: [],
                    pendingTrainings: [],
                    approvedTrainings: [],
                    completedTrainings: [],
                    rejectedTrainings: [],
                    pendingPersonalTrainings: [],
                    reviewedPersonalTrainings: [],
                    approvedPersonalTrainings: [],
                    completedPersonalTrainings: [],
                    rejectedPersonalTrainings: [],
                    events: [],
                    trainings: [],
                    entities: [],
                    department: [],
                    roles: [],
                    success: false,
                    loading: true
                },
                {
                    type: types.CREATE_TRAINING_ERROR,
                }
            )
        ).toEqual(
            {
                data: [],
                pendingTrainings: [],
                approvedTrainings: [],
                completedTrainings: [],
                rejectedTrainings: [],
                pendingPersonalTrainings: [],
                reviewedPersonalTrainings: [],
                approvedPersonalTrainings: [],
                completedPersonalTrainings: [],
                rejectedPersonalTrainings: [],
                events: [],
                trainings: [],
                entities: [],
                department: [],
                roles: [],
                success: false,
                loading: false
            }
        )
    })

    it('should handle a valid UPDATE_TRAINING_SUCCESS data', () => {
        expect(
            reducer(
                {
                    data: [],
                    pendingTrainings: [],
                    approvedTrainings: [],
                    completedTrainings: [],
                    rejectedTrainings: [],
                    pendingPersonalTrainings: [],
                    reviewedPersonalTrainings: [],
                    approvedPersonalTrainings: [],
                    completedPersonalTrainings: [],
                    rejectedPersonalTrainings: [],
                    events: [],
                    trainings: [],
                    entities: [],
                    department: [],
                    roles: [],
                    success: false,
                    loading: true
                },
                {
                    type: types.UPDATE_TRAINING_SUCCESS,
                }
            )
        ).toEqual(
            {
                data: [],
                pendingTrainings: [],
                approvedTrainings: [],
                completedTrainings: [],
                rejectedTrainings: [],
                pendingPersonalTrainings: [],
                reviewedPersonalTrainings: [],
                approvedPersonalTrainings: [],
                completedPersonalTrainings: [],
                rejectedPersonalTrainings: [],
                events: [],
                trainings: [],
                entities: [],
                department: [],
                roles: [],
                success: true,
                loading: false
            }
        )
    });

    it('should handle a valid UPDATE_TRAINING_ERROR data', () => {
        expect(
            reducer(
                {
                    data: [],
                    pendingTrainings: [],
                    approvedTrainings: [],
                    completedTrainings: [],
                    rejectedTrainings: [],
                    pendingPersonalTrainings: [],
                    reviewedPersonalTrainings: [],
                    approvedPersonalTrainings: [],
                    completedPersonalTrainings: [],
                    rejectedPersonalTrainings: [],
                    events: [],
                    trainings: [],
                    entities: [],
                    department: [],
                    roles: [],
                    success: false,
                    loading: true
                },
                {
                    type: types.UPDATE_TRAINING_ERROR,
                }
            )
        ).toEqual(
            {
                data: [],
                pendingTrainings: [],
                approvedTrainings: [],
                completedTrainings: [],
                rejectedTrainings: [],
                pendingPersonalTrainings: [],
                reviewedPersonalTrainings: [],
                approvedPersonalTrainings: [],
                completedPersonalTrainings: [],
                rejectedPersonalTrainings: [],
                events: [],
                trainings: [],
                entities: [],
                department: [],
                roles: [],
                success: false,
                loading: false
            }
        )
    });

    it('should handle a valid GET_ENTITIES data', () => {
        expect(
            reducer(
                {
                    data: [],
                    pendingTrainings: [],
                    approvedTrainings: [],
                    completedTrainings: [],
                    rejectedTrainings: [],
                    pendingPersonalTrainings: [],
                    reviewedPersonalTrainings: [],
                    approvedPersonalTrainings: [],
                    completedPersonalTrainings: [],
                    rejectedPersonalTrainings: [],
                    events: [],
                    trainings: [],
                    entities: [],
                    department: [],
                    roles: [],
                    success: false,
                    loading: true
                },
                {
                    type: types.GET_ENTITIES,
                    payload: [
                        {
                            entityName: "Adegoke"
                        }
                    ]
                }
            )
        ).toEqual(
            {
                data: [],
                pendingTrainings: [],
                approvedTrainings: [],
                completedTrainings: [],
                rejectedTrainings: [],
                pendingPersonalTrainings: [],
                reviewedPersonalTrainings: [],
                approvedPersonalTrainings: [],
                completedPersonalTrainings: [],
                rejectedPersonalTrainings: [],
                events: [],
                trainings: [],
                entities: [
                    {
                        entityName: "Adegoke"
                    }
                ],
                department: [],
                roles: [],
                success: false,
                loading: true
            }
        )
    });

    it('should handle a valid GET_DEPARTMENTS data', () => {
        expect(
            reducer(
                {
                    data: [],
                    pendingTrainings: [],
                    approvedTrainings: [],
                    completedTrainings: [],
                    rejectedTrainings: [],
                    pendingPersonalTrainings: [],
                    reviewedPersonalTrainings: [],
                    approvedPersonalTrainings: [],
                    completedPersonalTrainings: [],
                    rejectedPersonalTrainings: [],
                    events: [],
                    trainings: [],
                    entities: [],
                    department: [],
                    roles: [],
                    success: false,
                    loading: true
                },
                {
                    type: types.GET_DEPARTMENTS,
                    payload: [
                        {
                            department: "SpringRock Group"
                        }
                    ]
                }
            )
        ).toEqual(
            {
                data: [],
                pendingTrainings: [],
                approvedTrainings: [],
                completedTrainings: [],
                rejectedTrainings: [],
                pendingPersonalTrainings: [],
                reviewedPersonalTrainings: [],
                approvedPersonalTrainings: [],
                completedPersonalTrainings: [],
                rejectedPersonalTrainings: [],
                events: [],
                trainings: [],
                entities: [],
                department: [
                    {
                        department: "SpringRock Group"
                    }
                ],
                roles: [],
                success: false,
                loading: true
            }
        )
    });

    it('should handle a valid GET_ROLES data', () => {
        expect(
            reducer(
                {
                    data: [],
                    pendingTrainings: [],
                    approvedTrainings: [],
                    completedTrainings: [],
                    rejectedTrainings: [],
                    pendingPersonalTrainings: [],
                    reviewedPersonalTrainings: [],
                    approvedPersonalTrainings: [],
                    completedPersonalTrainings: [],
                    rejectedPersonalTrainings: [],
                    events: [],
                    trainings: [],
                    entities: [],
                    department: [],
                    roles: [],
                    success: false,
                    loading: true
                },
                {
                    type: types.GET_ROLES,
                    payload: [
                        {
                            department: "SpringRock Group"
                        }
                    ]
                }
            )
        ).toEqual(
            {
                data: [],
                pendingTrainings: [],
                approvedTrainings: [],
                completedTrainings: [],
                rejectedTrainings: [],
                pendingPersonalTrainings: [],
                reviewedPersonalTrainings: [],
                approvedPersonalTrainings: [],
                completedPersonalTrainings: [],
                rejectedPersonalTrainings: [],
                events: [],
                trainings: [],
                entities: [],
                roles: [
                    {
                        department: "SpringRock Group"
                    }
                ],
                department: [],
                success: false,
                loading: true
            }
        )
    });

    it('should handle a valid PENDING_TRAININGS_HR data', () => {
        expect(
            reducer(
                {
                    data: [],
                    pendingTrainings: [],
                    approvedTrainings: [],
                    completedTrainings: [],
                    rejectedTrainings: [],
                    pendingPersonalTrainings: [],
                    reviewedPersonalTrainings: [],
                    approvedPersonalTrainings: [],
                    completedPersonalTrainings: [],
                    rejectedPersonalTrainings: [],
                    events: [],
                    trainings: [],
                    entities: [],
                    department: [],
                    roles: [],
                    success: false,
                    loading: true
                },
                {
                    type: types.PENDING_TRAININGS_HR,
                    payload: [
                        {
                            id: "b837dg837g2i378ge8"
                        }
                    ]
                }
            )
        ).toEqual(
            {
                data: [],
                pendingTrainings: [
                    {
                        id: "b837dg837g2i378ge8"
                    }
                ],
                approvedTrainings: [],
                completedTrainings: [],
                rejectedTrainings: [],
                pendingPersonalTrainings: [],
                reviewedPersonalTrainings: [],
                approvedPersonalTrainings: [],
                completedPersonalTrainings: [],
                rejectedPersonalTrainings: [],
                events: [],
                trainings: [],
                entities: [],
                roles: [],
                department: [],
                success: false,
                loading: true
            }
        )
    });

    it('should handle a valid APPROVED_TRAININGS_HR data', () => {
        expect(
            reducer(
                {
                    data: [],
                    pendingTrainings: [],
                    approvedTrainings: [],
                    completedTrainings: [],
                    rejectedTrainings: [],
                    pendingPersonalTrainings: [],
                    reviewedPersonalTrainings: [],
                    approvedPersonalTrainings: [],
                    completedPersonalTrainings: [],
                    rejectedPersonalTrainings: [],
                    events: [],
                    trainings: [],
                    entities: [],
                    department: [],
                    roles: [],
                    success: false,
                    loading: true
                },
                {
                    type: types.APPROVED_TRAININGS_HR,
                    payload: [
                        {
                            id: "b837dg837g2i378ge8"
                        }
                    ]
                }
            )
        ).toEqual(
            {
                data: [],
                pendingTrainings: [],
                approvedTrainings: [
                    {
                        id: "b837dg837g2i378ge8"
                    }
                ],
                completedTrainings: [],
                rejectedTrainings: [],
                pendingPersonalTrainings: [],
                reviewedPersonalTrainings: [],
                approvedPersonalTrainings: [],
                completedPersonalTrainings: [],
                rejectedPersonalTrainings: [],
                events: [],
                trainings: [],
                entities: [],
                roles: [],
                department: [],
                success: false,
                loading: true
            }
        )
    });

    it('should handle a valid COMPLETED_TRAININGS_HR data', () => {
        expect(
            reducer(
                {
                    data: [],
                    pendingTrainings: [],
                    approvedTrainings: [],
                    completedTrainings: [],
                    rejectedTrainings: [],
                    pendingPersonalTrainings: [],
                    reviewedPersonalTrainings: [],
                    approvedPersonalTrainings: [],
                    completedPersonalTrainings: [],
                    rejectedPersonalTrainings: [],
                    events: [],
                    trainings: [],
                    entities: [],
                    department: [],
                    roles: [],
                    success: false,
                    loading: true
                },
                {
                    type: types.COMPLETED_TRAININGS_HR,
                    payload: [
                        {
                            id: "b837dg837g2i378ge8"
                        }
                    ]
                }
            )
        ).toEqual(
            {
                data: [],
                pendingTrainings: [],
                approvedTrainings: [],
                completedTrainings: [
                    {
                        id: "b837dg837g2i378ge8"
                    }
                ],
                rejectedTrainings: [],
                pendingPersonalTrainings: [],
                reviewedPersonalTrainings: [],
                approvedPersonalTrainings: [],
                completedPersonalTrainings: [],
                rejectedPersonalTrainings: [],
                events: [],
                trainings: [],
                entities: [],
                roles: [],
                department: [],
                success: false,
                loading: true
            }
        )
    });

    it('should handle a valid REJECTED_TRAININGS_HR data', () => {
        expect(
            reducer(
                {
                    data: [],
                    pendingTrainings: [],
                    approvedTrainings: [],
                    completedTrainings: [],
                    rejectedTrainings: [],
                    pendingPersonalTrainings: [],
                    reviewedPersonalTrainings: [],
                    approvedPersonalTrainings: [],
                    completedPersonalTrainings: [],
                    rejectedPersonalTrainings: [],
                    events: [],
                    trainings: [],
                    entities: [],
                    department: [],
                    roles: [],
                    success: false,
                    loading: true
                },
                {
                    type: types.REJECTED_TRAININGS_HR,
                    payload: [
                        {
                            id: "b837dg837g2i378ge8"
                        }
                    ]
                }
            )
        ).toEqual(
            {
                data: [],
                pendingTrainings: [],
                approvedTrainings: [],
                completedTrainings: [],
                rejectedTrainings: [
                    {
                        id: "b837dg837g2i378ge8"
                    }
                ],
                pendingPersonalTrainings: [],
                reviewedPersonalTrainings: [],
                approvedPersonalTrainings: [],
                completedPersonalTrainings: [],
                rejectedPersonalTrainings: [],
                events: [],
                trainings: [],
                entities: [],
                roles: [],
                department: [],
                success: false,
                loading: true
            }
        )
    });

    it('should handle a valid PENDING_TRAININGS_PERSONAL data', () => {
        expect(
            reducer(
                {
                    data: [],
                    pendingTrainings: [],
                    approvedTrainings: [],
                    completedTrainings: [],
                    rejectedTrainings: [],
                    pendingPersonalTrainings: [],
                    reviewedPersonalTrainings: [],
                    approvedPersonalTrainings: [],
                    completedPersonalTrainings: [],
                    rejectedPersonalTrainings: [],
                    events: [],
                    trainings: [],
                    entities: [],
                    department: [],
                    roles: [],
                    success: false,
                    loading: true
                },
                {
                    type: types.PENDING_TRAININGS_PERSONAL,
                    payload: [
                        {
                            id: "b837dg837g2i378ge8"
                        }
                    ]
                }
            )
        ).toEqual(
            {
                data: [],
                pendingTrainings: [],
                approvedTrainings: [],
                completedTrainings: [],
                rejectedTrainings: [],
                pendingPersonalTrainings: [
                    {
                        id: "b837dg837g2i378ge8"
                    }
                ],
                reviewedPersonalTrainings: [],
                approvedPersonalTrainings: [],
                completedPersonalTrainings: [],
                rejectedPersonalTrainings: [],
                events: [],
                trainings: [],
                entities: [],
                roles: [],
                department: [],
                success: false,
                loading: true
            }
        )
    });

    it('should handle a valid APPROVED_TRAININGS_PERSONAL data', () => {
        expect(
            reducer(
                {
                    data: [],
                    pendingTrainings: [],
                    approvedTrainings: [],
                    completedTrainings: [],
                    rejectedTrainings: [],
                    pendingPersonalTrainings: [],
                    reviewedPersonalTrainings: [],
                    approvedPersonalTrainings: [],
                    completedPersonalTrainings: [],
                    rejectedPersonalTrainings: [],
                    events: [],
                    trainings: [],
                    entities: [],
                    department: [],
                    roles: [],
                    success: false,
                    loading: true
                },
                {
                    type: types.APPROVED_TRAININGS_PERSONAL,
                    payload: [
                        {
                            id: "b837dg837g2i378ge8"
                        }
                    ]
                }
            )
        ).toEqual(
            {
                data: [],
                pendingTrainings: [],
                approvedTrainings: [],
                completedTrainings: [],
                rejectedTrainings: [],
                pendingPersonalTrainings: [],
                reviewedPersonalTrainings: [],
                approvedPersonalTrainings: [
                    {
                        id: "b837dg837g2i378ge8"
                    }
                ],
                completedPersonalTrainings: [],
                rejectedPersonalTrainings: [],
                events: [],
                trainings: [],
                entities: [],
                roles: [],
                department: [],
                success: false,
                loading: true
            }
        )
    });

    it('should handle a valid REVIEWED_TRAININGS_PERSONAL data', () => {
        expect(
            reducer(
                {
                    data: [],
                    pendingTrainings: [],
                    approvedTrainings: [],
                    completedTrainings: [],
                    rejectedTrainings: [],
                    pendingPersonalTrainings: [],
                    reviewedPersonalTrainings: [],
                    approvedPersonalTrainings: [],
                    completedPersonalTrainings: [],
                    rejectedPersonalTrainings: [],
                    events: [],
                    trainings: [],
                    entities: [],
                    department: [],
                    roles: [],
                    success: false,
                    loading: true
                },
                {
                    type: types.REVIEWED_TRAININGS_PERSONAL,
                    payload: [
                        {
                            id: "b837dg837g2i378ge8"
                        }
                    ]
                }
            )
        ).toEqual(
            {
                data: [],
                pendingTrainings: [],
                approvedTrainings: [],
                completedTrainings: [],
                rejectedTrainings: [],
                pendingPersonalTrainings: [],
                reviewedPersonalTrainings: [
                    {
                        id: "b837dg837g2i378ge8"
                    }
                ],
                approvedPersonalTrainings: [],
                completedPersonalTrainings: [],
                rejectedPersonalTrainings: [],
                events: [],
                trainings: [],
                entities: [],
                roles: [],
                department: [],
                success: false,
                loading: true
            }
        )
    });

    it('should handle a valid COMPLETED_TRAININGS_PERSONAL data', () => {
        expect(
            reducer(
                {
                    data: [],
                    pendingTrainings: [],
                    approvedTrainings: [],
                    completedTrainings: [],
                    rejectedTrainings: [],
                    pendingPersonalTrainings: [],
                    reviewedPersonalTrainings: [],
                    approvedPersonalTrainings: [],
                    completedPersonalTrainings: [],
                    rejectedPersonalTrainings: [],
                    events: [],
                    trainings: [],
                    entities: [],
                    department: [],
                    roles: [],
                    success: false,
                    loading: true
                },
                {
                    type: types.COMPLETED_TRAININGS_PERSONAL,
                    payload: [
                        {
                            id: "b837dg837g2i378ge8"
                        }
                    ]
                }
            )
        ).toEqual(
            {
                data: [],
                pendingTrainings: [],
                approvedTrainings: [],
                completedTrainings: [],
                rejectedTrainings: [],
                pendingPersonalTrainings: [],
                reviewedPersonalTrainings: [],
                approvedPersonalTrainings: [],
                completedPersonalTrainings: [
                    {
                        id: "b837dg837g2i378ge8"
                    }
                ],
                rejectedPersonalTrainings: [],
                events: [],
                trainings: [],
                entities: [],
                roles: [],
                department: [],
                success: false,
                loading: true
            }
        )
    });

    it('should handle a valid REJECTED_TRAININGS_PERSONAL data', () => {
        expect(
            reducer(
                {
                    data: [],
                    pendingTrainings: [],
                    approvedTrainings: [],
                    completedTrainings: [],
                    rejectedTrainings: [],
                    pendingPersonalTrainings: [],
                    reviewedPersonalTrainings: [],
                    approvedPersonalTrainings: [],
                    completedPersonalTrainings: [],
                    rejectedPersonalTrainings: [],
                    events: [],
                    trainings: [],
                    entities: [],
                    department: [],
                    roles: [],
                    success: false,
                    loading: true
                },
                {
                    type: types.REJECTED_TRAININGS_PERSONAL,
                    payload: [
                        {
                            id: "b837dg837g2i378ge8"
                        }
                    ]
                }
            )
        ).toEqual(
            {
                data: [],
                pendingTrainings: [],
                approvedTrainings: [],
                completedTrainings: [],
                rejectedTrainings: [],
                pendingPersonalTrainings: [],
                reviewedPersonalTrainings: [],
                approvedPersonalTrainings: [],
                completedPersonalTrainings: [],
                rejectedPersonalTrainings: [
                    {
                        id: "b837dg837g2i378ge8"
                    }
                ],
                events: [],
                trainings: [],
                entities: [],
                roles: [],
                department: [],
                success: false,
                loading: true
            }
        )
    });

})