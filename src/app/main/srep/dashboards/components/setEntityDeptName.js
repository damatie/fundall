export const updatedEnrollmentList = (enrollmentList = [], entities = []) => {
    const returnEnrollmentList = enrollmentList.map(srep => {
        let entityName = 'null';
        let departments = [];
        let departmentName = 'null';
        entities && entities.filter(e => { 
            if (e.id === srep.entityId) {
                entityName = e.entityName;
                departments = e.department;
            };
        });
        departments.filter(e => { 
            if (e.id === srep.departmentId) {
                departmentName = e.departmentName;
            };	
        });

        return {
            ...srep,
            entity: entityName,
            department: departmentName,
            year: srep.year.toString(), 
        }
    });
    console.log("returnEnrollmentList: ", returnEnrollmentList);
    return returnEnrollmentList;
};