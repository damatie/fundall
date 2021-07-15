export const updatedEnrollmentList = (enrollmentList = [], entities = []) => {
    const returnEnrollmentList = enrollmentList.map(srep => {
        let entityName = 'null';
        let departments = [];
        let departmentName = 'null';
        // console.log('entities for relative department: ', entities);
        entities && entities.filter(e => {
            if (e.id === srep.entityId) {
                entityName = e.entityName ? e.entityName : srep.entity;
                departments = e.department ? e.department : [];
            };
        });
        departments.filter(e => { 
            if (e.id === srep.departmentId) {
                departmentName = e.departmentName ? e.departmentName : srep.department;
            };	
        });

        return {
            ...srep,
            entity: entityName,
            department: departmentName,
            year: srep.year.toString(), 
        }
    });
    // console.log("returnEnrollmentList: ", returnEnrollmentList);
    return returnEnrollmentList;
};