import ContactCard from "./ContactCard";
import ContactInfo from "./ContactInfo";

function ContactSection() {
   return (
      <div className="px-10 pt-40">
         <ContactCard />

         <div className="mt-20">
            <ContactInfo />
         </div>
      </div>
   );
}

export default ContactSection;
