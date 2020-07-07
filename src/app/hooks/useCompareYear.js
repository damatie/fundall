import { useState, useEffect } from 'react';

export const useCompareYear = data => {
  const [result, setResult] = useState([]);

  useEffect(() => {
    if(data.length === 0) {
      setResult(0);
    } else {
      for(const i of data) {
        if(i.allotedYear == new Date().getFullYear()) {
          setResult(i)
        }
      }
    }
  }, [data])

  return { result };
};