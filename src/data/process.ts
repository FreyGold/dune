// Process steps data
export interface ProcessStep {
   id: string;
   step: string;
   title: string;
   description: string;
}

export const processSteps: ProcessStep[] = [
   {
      id: "step-1",
      step: "01",
      title: "Requirements & Planning",
      description: "Clarify scope, user stories, and acceptance criteria. Define success metrics and milestones to align expectations and timelines."
   },
   {
      id: "step-2",
      step: "02",
      title: "UI Implementation",
      description: "Build accessible, responsive components from the design system. Ensure visual fidelity, micro-interactions, and smooth animations."
   },
   {
      id: "step-3",
      step: "03",
      title: "Data & State Integration",
      description: "Integrate APIs, manage state and caching, and handle loading, errors, and optimistic updates for a seamless UX."
   },
   {
      id: "step-4",
      step: "04",
      title: "Performance & Accessibility",
      description: "Profile and optimize with code-splitting, lazy loading, and bundle analysis. Audit a11y (WCAG), keyboard navigation, and semantics."
   }
];
