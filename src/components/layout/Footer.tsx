import { siteData } from "@/data/data";
import { Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-card py-12">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="font-heading text-xl font-bold">
            ALEX<span className="text-primary">_DEV</span>
          </span>
          <p className="text-sm opacity-70 mt-1">Building digital products with excellence</p>
        </div>
        <div className="flex items-center gap-4">
          <a href={siteData.personalInfo.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            <Github size={20} />
          </a>
          <a href={siteData.personalInfo.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            <Linkedin size={20} />
          </a>
          <a href={siteData.personalInfo.socials.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            <Twitter size={20} />
          </a>
        </div>
        <p className="text-sm opacity-70">
          © {new Date().getFullYear()} {siteData.personalInfo.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
