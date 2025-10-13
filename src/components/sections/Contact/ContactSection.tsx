import ContactCard from "./ContactCard";

function ContactSection() {
   return (
      <div className="px-10 pt-40">
         <ContactCard />
         <div className="bg-[#A3A3A3]/50 w-[calc(100%-120px)] h-[1px] my-22.5 rounded-full mx-auto"></div>
         <div className="min-h-[100vh] bg-amber-200"></div>
      </div>
   );
}

export default ContactSection;
