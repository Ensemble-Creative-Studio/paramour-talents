// components/Layout/index.js
"use client"
import { motion } from "framer-motion";

const Layout = ({ children }) => (
  <motion.div
    initial={{  opacity: 0 }}
    animate={{  opacity: 1 }}
    exit={{  opacity: 0 }}
    transition={{
        duration:0.5,
   ease:'easeInOut'
    }}
  >
    {children}
  </motion.div>
);
export default Layout;