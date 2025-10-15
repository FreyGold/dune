import { createContext, useContext, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

interface GSAPContextType {
  smoother: React.MutableRefObject<ScrollSmoother | null>;
  refreshScrollers: () => void;
}

const GSAPContext = createContext<GSAPContextType | null>(null);

export const useGSAPContext = () => {
  const context = useContext(GSAPContext);
  if (!context) {
    throw new Error('useGSAPContext must be used within a GSAPProvider');
  }
  return context;
};

interface GSAPProviderProps {
  children: React.ReactNode;
}

export const GSAPProvider = ({ children }: GSAPProviderProps) => {
  const main = useRef(null);
  const smoother = useRef<ScrollSmoother | null>(null);

  useGSAP(
    () => {
      // Create the smooth scroller
      const smootherInstance = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 2,
        effects: true,
      });

      smoother.current = smootherInstance;

      // Refresh after DOM is ready and handle scroll position
      const refreshTimer = setTimeout(() => {
        refreshScrollers();

        // Always scroll to top immediately on initialization - override any saved position
        // No smooth scrolling, just jump to top
        smootherInstance.scrollTo(0, false);

        // Ensure body stays hidden during the entire initialization process
        // Use multiple animation frames to ensure smooth transition
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            document.body.classList.add('loaded');
          });
        });
      }, 150); // Increased timeout to ensure proper initialization

      return () => {
        clearTimeout(refreshTimer);
        smootherInstance.kill();
      };
    },
    { scope: main, dependencies: [] }
  );

  const refreshScrollers = () => {
    if (smoother.current) {
      ScrollTrigger.refresh();
      smoother.current.refresh();
    }
  };

  return (
    <GSAPContext.Provider value={{ smoother, refreshScrollers }}>
      <div id="smooth-wrapper" ref={main}>
        {children}
      </div>
    </GSAPContext.Provider>
  );
};
