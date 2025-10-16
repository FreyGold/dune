import ContactCard from "./ContactCard";
import ContactInfo from "./ContactInfo";

function ContactSection() {
   return (
      <div className="px-4 sm:px-6 md:px-8 lg:px-10 pt-20 md:pt-32 lg:pt-40 animate-fade-in">
         <ContactCard />

         <div className="mt-10 md:mt-16 lg:mt-20">
            <ContactInfo />
         </div>
      </div>
   );
}

export default ContactSection;
