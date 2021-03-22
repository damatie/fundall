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
            sn: srep.sn,
            id: srep.id,
            name: srep.name,
            status: srep.status,
            entityId: srep.entityId,
            entity: entityName,
            departmentId: srep.departmentId,
            department: departmentName,
            capitalFund: srep.capitalFund,
            beneficiaryName: srep.beneficiaryName,
            beneficiaryRelationship: srep.beneficiaryRelationship,
            beneficiaryNationality: srep.beneficiaryNationality,
            beneficiaryGender: srep.beneficiaryGender,	
            beneficiaryEmail: srep.beneficiaryEmail,
            beneficiaryPhone: srep.beneficiaryPhone,
            createdAt: srep.createdAt,
            year: srep.year,
            employeePhoneNo: srep.employeePhoneNo,
            employeeEmail: srep.employeeEmail 
        }
    });
    return returnEnrollmentList;
};