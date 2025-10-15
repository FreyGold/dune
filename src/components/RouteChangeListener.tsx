import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useGSAPContext } from '../contexts/GSAPContext';

export const RouteChangeListener = () => {
  const location = useLocation();
  const { refreshScrollers, smoother } = useGSAPContext();

  useEffect(() => {
    // Refresh GSAP scrollers whenever the route changes
    const refreshTimer = setTimeout(() => {
      refreshScrollers();

      // Just scroll to top immediately - normal navigation
      if (smoother.current) {
        smoother.current.scrollTo(0, false);
      }
    }, 50);

    return () => clearTimeout(refreshTimer);
  }, [location.pathname, refreshScrollers, smoother]);

  return null; // This component doesn't render anything
};
