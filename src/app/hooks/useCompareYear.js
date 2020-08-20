import { useState, useEffect } from 'react';

export const useCompareYear = (data, id) => {
  const [result, setResult] = useState({});

  useEffect(() => {
    for(const i of data) {
      if(i.allotedYear == new Date().getFullYear()) {
        if(i.employeeId == id) {
          setResult(i.originalAllocatedDays)
        }
      }
    }

  }, [data])

  return { result };
};