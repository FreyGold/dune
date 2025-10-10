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
      title: "Discovery & Strategy",
      description: "I dive deep into understanding your vision, goals, and target audience. Through collaborative discussions and research, we establish a clear roadmap that aligns with your objectives."
   },
   {
      id: "step-2",
      step: "02",
      title: "Design & Prototyping",
      description: "With insights in hand, I craft intuitive user experiences and visual designs. I create prototypes that bring ideas to life, ensuring every interaction feels natural and purposeful."
   },
   {
      id: "step-3",
      step: "03",
      title: "Development & Implementation",
      description: "I transform designs into pixel-perfect, responsive code. Using modern technologies and best practices, I build robust solutions that perform seamlessly across all devices."
   },
   {
      id: "step-4",
      step: "04",
      title: "Testing & Launch",
      description: "Rigorous testing ensures quality and reliability. I fine-tune every detail before launch, then provide ongoing support to keep your digital presence evolving and thriving."
   }
];
