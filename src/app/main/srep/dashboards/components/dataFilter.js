export const filterData = (enrollmentList = [], search = '', Yearfilter = 'all', Entityfilter = 'all', Departmentfilter = 'all') => {
            let searchArr = [];
            let yearArr = [];
            let entityArr = [];
            let departmentArr = [];
            let dataNew = [];
            if (search !== '' || Yearfilter !== 'all' || Entityfilter !== 'all' || Departmentfilter !== 'all') {
                if (search !== '') {
                    searchArr = searchfilterMethod(enrollmentList, search);
                    if (searchArr.length === 0) {
                        return [];
                    }
                    dataNew = searchArr;
                }
                if (Yearfilter !== 'all') {
                    yearArr = searchArr.length > 0 ? yearfilterMethod(searchArr, Yearfilter) : yearfilterMethod(enrollmentList, Yearfilter);
                    if (yearArr.length === 0) {
                        return [];
                    }
                    dataNew = yearArr;
                }
                if (Entityfilter !== 'all') {
                    if (Yearfilter === 'all') {
                        entityArr = searchArr.length > 0 ? entityfilterMethod(searchArr, Entityfilter) : entityfilterMethod(enrollmentList, Entityfilter);
                    } else {
                        entityArr = yearArr.length > 0 ? entityfilterMethod(yearArr, Entityfilter) : entityfilterMethod(enrollmentList, Entityfilter);
                    }
                    if (entityArr.length === 0) {
                        return [];
                    }
                    dataNew = entityArr;
                    
                    if (Departmentfilter !== 'all') {
                        if (entityArr.length > 0) {
                            departmentArr = departmentfilterMethod(entityArr, Departmentfilter);
                            if (departmentArr.length === 0) {
                                return [];
                            }
                            dataNew = departmentArr;
                        }
                    }
                }
                return dataNew;
            } else {
                return enrollmentList;
            }
        }

        const searchfilterMethod = (arr, search) => {
            const results = arr.filter(obj => Object.keys(obj).some(key => obj[key].toString().toUpperCase().includes(search.toUpperCase())))
            return results;
        }

        const yearfilterMethod = (arr, Yearfilter) => {
            const newYearArr = arr.filter(e => {
                return e.year.toUpperCase() === Yearfilter.toUpperCase();
            })
            return newYearArr;
        }

        const entityfilterMethod = (arr, Entityfilter) => {
            const newEntityArr = arr.filter(e => {
                return e.entity.toUpperCase() === Entityfilter.toUpperCase();
            })
            return newEntityArr;
        }

        const departmentfilterMethod = (arr, Departmentfilter) => {
            const newDepartmentArr = arr.filter(e => {
                return e.department.toUpperCase() === Departmentfilter.toUpperCase();
            })
            return newDepartmentArr;
        }