import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection Observer — only active on homepage
  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
      return;
    }

    const sections = ["about", "services", "projects", "contact"];
    const observers: IntersectionObserver[] = [];

    const handleIntersect = (id: string) => (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSection(id);
      });
    };

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(handleIntersect(id), {
        rootMargin: "-30% 0px -60% 0px",
        threshold: 0,
      });
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  }, [location.pathname]);

  const navLinks = [
    { href: "#about",    label: "About",    id: "about" },
    { href: "#services", label: "Services", id: "services" },
    { href: "#projects", label: "Portfolio", id: "projects" },
    { href: "#contact",  label: "Contact",  id: "contact" },
  ];

  /**
   * Smart scroll-to:
   * – If already on "/", just smooth-scroll to the section.
   * – If on another route, navigate to "/" first, then scroll after the page loads.
   */
  const scrollTo = (sectionId: string) => {
    setIsOpen(false);

    if (location.pathname === "/") {
      const el = document.getElementById(sectionId);
      el?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      // Give the home page a moment to mount before scrolling
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        el?.scrollIntoView({ behavior: "smooth" });
      }, 350);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-card/95 backdrop-blur-sm accent-shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-0">
        <Link to="/" className="font-heading text-xl font-bold">
          ALEX<span className="text-accent">_DEV</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.id)}
              className={`relative font-medium text-sm uppercase tracking-wider transition-colors hover:text-accent ${
                activeSection === link.id ? "text-accent" : ""
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-[3px] bg-accent rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
          <Link
            to="/admin"
            className="bg-foreground text-card px-5 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Hire Us
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-accent/10 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-card border-b-2 border-accent overflow-hidden"
          >
            <div className="container mx-auto py-4 px-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.id)}
                  className={`text-left font-medium text-sm uppercase tracking-wider py-3 px-2 rounded-md transition-colors hover:bg-accent/10 hover:text-accent ${
                    activeSection === link.id ? "text-accent bg-accent/10" : ""
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-2 border-t border-border mt-2">
                <Link
                  to="/admin"
                  className="block bg-foreground text-card px-5 py-2.5 rounded-md text-sm font-semibold text-center hover:opacity-90 transition-opacity"
                  onClick={() => setIsOpen(false)}
                >
                  Hire Us
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
