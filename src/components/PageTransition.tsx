import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const variants: Variants = {
  initial: {
    opacity: 0,
    y: 18,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.38,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.22,
      ease: "easeIn",
    },
  },
};

const PageTransition = ({ children }: PageTransitionProps) => (
  <motion.div
    variants={variants}
    initial="initial"
    animate="animate"
    exit="exit"
    style={{ willChange: "opacity, transform" }}
  >
    {children}
  </motion.div>
);

export default PageTransition;
