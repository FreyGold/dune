import {
   BiLogoGithub,
   BiLogoLinkedin,
   BiLogoTwitter,
   BiEnvelope,
} from "react-icons/bi";

interface SocialLink {
   name: string;
   url: string;
   icon: React.ReactNode;
}

function ContactCard() {
   const socialLinks: SocialLink[] = [
      {
         name: "GitHub",
         url: "https://github.com/FreyGold",
         icon: <BiLogoGithub />,
      },
      {
         name: "Twitter",
         url: "https://x.com/TeslaLeftArm",
         icon: <BiLogoTwitter />,
      },
      {
         name: "LinkedIn",
         url: "https://www.linkedin.com/in/ahmed-tawfik-458353165/",
         icon: <BiLogoLinkedin />,
      },
      {
         name: "Email",
         url: "mailto:ahmedtawfik833@gmail.com",
         icon: <BiEnvelope />,
      },
   ];
   return (
      <div className="grid grid-cols-2 gap-15 uppercase">
         <div className="flex flex-col">
            <h1 className="pt-10 font-grotesk text-[3.125rem] font-bold">
               Ring A Bell!
            </h1>
            <p className="text-[#A3A3A3] text-xl mt-5 font-roboto">
               Reach out and let's create something amazing together. Let's
               achieve greatness.
            </p>
            <div className="mt-8">
               {/* Social Media Links */}
               <div className="flex flex-wrap gap-3 sm:gap-4">
                  {socialLinks.map((social, index) => (
                     <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors text-lg click-me">
                        <span className="text-xl">{social.icon}</span>
                        {social.name}
                     </a>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
}

export default ContactCard;
