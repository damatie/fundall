import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const { useState, useEffect } = React;

const useUserID = () => {
  const [userId, setUserId] = useState(null);

  const user = useSelector(state => state.auth.user);

  const { id } = useParams();

  const getUserId = () => {
    !!id ?  setUserId(id) : setUserId(user?.id)
  };

  useEffect(() => {
    getUserId();
  }, [id, user]);

  return {
    id: userId,
  };
};

export default useUserID;