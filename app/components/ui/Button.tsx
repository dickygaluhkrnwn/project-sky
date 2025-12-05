"use client";

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  variant?: 'primary' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  className = '', 
  variant = 'primary',
  ...props 
}) => {
  const baseStyles = "px-8 py-3 rounded-full font-serif text-lg transition-all duration-300 flex items-center gap-2 justify-center";
  
  const variants = {
    primary: "bg-gradient-to-r from-lilac-500 to-sky-blue text-white shadow-lg shadow-lilac-300/50 hover:shadow-sky-blue/50",
    outline: "bg-transparent border-2 border-lilac-500 text-lilac-500 hover:bg-lilac-500/10"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
};