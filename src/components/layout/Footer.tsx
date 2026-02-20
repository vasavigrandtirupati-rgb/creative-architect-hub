import { siteData } from "@/data/data";
import { Github, Linkedin, Twitter, ArrowUpRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-card">
      <div className="container mx-auto py-12 px-4 md:px-8">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div>
            <span className="font-heading text-xl font-bold">
              ALEX<span className="text-primary">_DEV</span>
            </span>
            <p className="text-sm opacity-60 mt-2 max-w-xs">
              Building digital products with excellence. Available for freelance & consulting.
            </p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <a href={siteData.personalInfo.socials.github} target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-card/20 flex items-center justify-center hover:bg-primary hover:text-foreground hover:border-primary transition-all">
              <Github size={18} />
            </a>
            <a href={siteData.personalInfo.socials.linkedin} target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-card/20 flex items-center justify-center hover:bg-primary hover:text-foreground hover:border-primary transition-all">
              <Linkedin size={18} />
            </a>
            <a href={siteData.personalInfo.socials.twitter} target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-card/20 flex items-center justify-center hover:bg-primary hover:text-foreground hover:border-primary transition-all">
              <Twitter size={18} />
            </a>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-60">
              © {new Date().getFullYear()} {siteData.personalInfo.name}
            </p>
            <p className="text-xs opacity-40 mt-1">All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
