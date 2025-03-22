import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  trackJobView,
  fetchJobAnalytics,
  fetchEmployerAnalytics,
  fetchJobSeekerAnalytics,
  clearAnalytics,
  clearError
} from '../store/slices/analyticsSlice';

export const useAnalytics = () => {
  const dispatch = useDispatch();
  const {
    jobAnalytics,
    employerAnalytics,
    jobSeekerAnalytics,
    loading,
    error
  } = useSelector((state) => state.analytics);

  useEffect(() => {
    return () => {
      dispatch(clearAnalytics());
      dispatch(clearError());
    };
  }, [dispatch]);

  const trackView = (jobId) => {
    return dispatch(trackJobView(jobId));
  };

  const getJobAnalytics = (jobId) => {
    dispatch(fetchJobAnalytics(jobId));
  };

  const getEmployerAnalytics = () => {
    dispatch(fetchEmployerAnalytics());
  };

  const getJobSeekerAnalytics = () => {
    dispatch(fetchJobSeekerAnalytics());
  };

  return {
    jobAnalytics,
    employerAnalytics,
    jobSeekerAnalytics,
    loading,
    error,
    trackView,
    getJobAnalytics,
    getEmployerAnalytics,
    getJobSeekerAnalytics
  };
}; 