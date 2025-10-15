import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useGSAPContext } from '../contexts/GSAPContext';

export const RouteChangeListener = () => {
  const location = useLocation();
  const { refreshScrollers } = useGSAPContext();

  useEffect(() => {
    // Refresh GSAP scrollers whenever the route changes
    const refreshTimer = setTimeout(() => {
      refreshScrollers();
    }, 50); // Small delay to ensure DOM is updated

    return () => clearTimeout(refreshTimer);
  }, [location.pathname, refreshScrollers]);

  return null; // This component doesn't render anything
};
