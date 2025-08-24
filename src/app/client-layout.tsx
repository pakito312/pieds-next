'use client';

import { ReactNode } from "react";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ClientLayout({
  children,
  htmlAttrs = {},
  bodyAttrs = {},
}: {
  children: React.ReactNode;
  htmlAttrs?: Record<string, string>;
  bodyAttrs?: Record<string, string>;
}) {
  return (
    <html {...htmlAttrs}>
      <body {...bodyAttrs}>
        <AnimatePresence mode="wait" key="animate-presence">
        <Navbar key="navbar" />
        <motion.div
      key="motion-main"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
    >
        <TooltipProvider><QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider></TooltipProvider>
        </motion.div>
        <Footer key="footer" />
        <Toaster key="toaster" />
        <Sonner key="sonner" />
        </AnimatePresence>
      </body>
    </html>
  );
}