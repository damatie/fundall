import reducer from './courses.reducer'
import * as types from '../actions'

describe('course reducer', () => {

    it('should handle a valid LOADING_COURSES data', () => {
        expect(
            reducer(
                {
                    courses: [],
                    categories: [],
                    totalNo: 0,
                    loading: true,
                    success: false
                },
                {
                    type: types.LOADING_COURSES,
                }
            )
        ).toEqual(
            {
                courses: [],
                categories: [],
                totalNo: 0,
                loading: true,
                success: false
            }
        )
    });

    it('should handle a valid LOADING_COURSE_CATEGORIES data', () => {
        expect(
            reducer(
                {
                    courses: [],
                    categories: [],
                    totalNo: 0,
                    loading: true,
                    success: false
                },
                {
                    type: types.LOADING_COURSE_CATEGORIES,
                }
            )
        ).toEqual(
            {
                courses: [],
                categories: [],
                totalNo: 0,
                loading: true,
                success: false
            }
        )
    });

    it('should handle a valid GET_COURSES data', () => {
        let dummyPayload = [
            {
                name: "Adegoke",
            }
        ]

        expect(
            reducer(
                {
                    courses: [],
                    categories: [],
                    totalNo: 0,
                    loading: true,
                    success: false
                },
                {
                    type: types.GET_COURSES,
                    payload: dummyPayload,
                    totalNo: 90
                }
            )
        ).toEqual(
            {
                courses: dummyPayload,
                categories: [],
                totalNo: 90,
                loading: false,
                success: false
            }
        )
    });

    it('should handle a valid GET_COURSE_CATEGORIES data', () => {
        let dummyPayload = [
            {
                name: "Adegoke",
            }
        ]
        expect(
            reducer(
                {
                    courses: [],
                    categories: [],
                    totalNo: 0,
                    loading: true,
                    success: false
                },
                {
                    type: types.GET_COURSE_CATEGORIES,
                    payload: dummyPayload
                }
            )
        ).toEqual(
            {
                courses: [],
                categories: dummyPayload,
                totalNo: 0,
                loading: false,
                success: false
            }
        )
    });

})