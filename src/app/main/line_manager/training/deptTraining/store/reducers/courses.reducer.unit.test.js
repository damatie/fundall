import reducer from './courses.reducer'
import * as types from '../actions'

describe('course reducer', () => {

    it('should handle a valid LOADING_COURSES data', () => {
        expect(
            reducer(
                {
                    loading: true,
                    totalCourses: [],
                    approvedCourses: [],
                    rejectedCourses: [],
                    pendingCourses: [],
                    courseCategories: [],
                    success: false
                },
                {
                    type: types.LOADING_COURSES,
                }
            )
        ).toEqual(
            {
                loading: true,
                totalCourses: [],
                approvedCourses: [],
                rejectedCourses: [],
                pendingCourses: [],
                courseCategories: [],
                success: false
            }
        )
    });

    it('should handle a valid LOADING_COURSE_CATEGORIES data', () => {
        expect(
            reducer(
                {
                    loading: true,
                    totalCourses: [],
                    approvedCourses: [],
                    rejectedCourses: [],
                    pendingCourses: [],
                    courseCategories: [],
                    success: false
                },
                {
                    type: types.LOADING_COURSE_CATEGORIES,
                }
            )
        ).toEqual(
            {
                loading: true,
                totalCourses: [],
                approvedCourses: [],
                rejectedCourses: [],
                pendingCourses: [],
                courseCategories: [],
                success: false
            }
        )
    });

    // it('should handle a valid GET_APPROVED_COURSES data', () => {
    //     let dummyPayload = [
    //         {
    //             name: "Adegoke",
    //         }
    //     ]

    //     expect(
    //         reducer(
    //             {
    //                 loading: true,
    //                 totalCourses: [],
    //                 approvedCourses: [],
    //                 rejectedCourses: [],
    //                 pendingCourses: [],
    //                 courseCategories: [],
    //                 success: false
    //             },
    //             {
    //                 type: types.GET_APPROVED_COURSES,
    //                 approvedCourses: dummyPayload,
    //             }
    //         )
    //     ).toEqual(
    //         {
    //             loading: false,
    //             totalCourses: [],
    //             approvedCourses: dummyPayload,
    //             rejectedCourses: [],
    //             pendingCourses: [],
    //             courseCategories: [],
    //             success: false
    //         }
    //     )
    // });

    // it('should handle a valid GET_REJECTED_COURSES data', () => {
    //     let dummyPayload = [
    //         {
    //             name: "Adegoke",
    //         }
    //     ]

    //     expect(
    //         reducer(
    //             {
    //                 loading: true,
    //                 totalCourses: [],
    //                 approvedCourses: [],
    //                 rejectedCourses: [],
    //                 pendingCourses: [],
    //                 courseCategories: [],
    //                 success: false
    //             },
    //             {
    //                 type: types.GET_REJECTED_COURSES,
    //                 approvedCourses: dummyPayload,
    //             }
    //         )
    //     ).toEqual(
    //         {
    //             loading: false,
    //             totalCourses: [],
    //             approvedCourses: [],
    //             rejectedCourses: dummyPayload,
    //             pendingCourses: [],
    //             courseCategories: [],
    //             success: false
    //         }
    //     )
    // });

    // it('should handle a valid GET_PENDING_COURSES data', () => {
    //     let dummyPayload = [
    //         {
    //             name: "Adegoke",
    //         }
    //     ]

    //     expect(
    //         reducer(
    //             {
    //                 loading: true,
    //                 totalCourses: [],
    //                 approvedCourses: [],
    //                 rejectedCourses: [],
    //                 pendingCourses: [],
    //                 courseCategories: [],
    //                 success: false
    //             },
    //             {
    //                 type: types.GET_PENDING_COURSES,
    //                 approvedCourses: dummyPayload,
    //             }
    //         )
    //     ).toEqual(
    //         {
    //             loading: false,
    //             totalCourses: [],
    //             approvedCourses: [],
    //             rejectedCourses: [],
    //             pendingCourses: dummyPayload,
    //             courseCategories: [],
    //             success: false
    //         }
    //     )
    // });

    // it('should handle a valid GET_COURSE_CATEGORIES data', () => {
    //     let dummyPayload = [
    //         {
    //             name: "Adegoke",
    //         }
    //     ];

    //     expect(
    //         reducer(
    //             {
    //                 loading: true,
    //                 totalCourses: [],
    //                 approvedCourses: [],
    //                 rejectedCourses: [],
    //                 pendingCourses: [],
    //                 courseCategories: dummyPayload,
    //                 success: false
    //             },
    //             {
    //                 type: types.GET_COURSE_CATEGORIES,
    //                 approvedCourses: dummyPayload,
    //             }
    //         )
    //     ).toEqual(
    //         {
    //             loading: false,
    //             totalCourses: [],
    //             approvedCourses: [],
    //             rejectedCourses: [],
    //             pendingCourses: [],
    //             courseCategories: dummyPayload,
    //             success: false
    //         }
    //     )
    // });

})