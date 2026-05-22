"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle, CheckCircle, Info } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "error") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-remove toast after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Toast Portal Layer */}
      <div className="fixed bottom-6 right-6 z-9999 flex flex-col gap-3 w-full max-w-sm pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="pointer-events-auto w-full bg-[#111111]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-start gap-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              {/* Type-Specific Icons with Premium Outer Glows */}
              <div className="mt-0.5 shrink-0">
                {toast.type === "error" && (
                  <div className="p-1.5 bg-[#FF1A1A]/10 border border-[#FF1A1A]/30 rounded-lg text-[#FF1A1A] shadow-[0_0_15px_rgba(255,26,26,0.15)]">
                    <AlertCircle size={16} />
                  </div>
                )}
                {toast.type === "success" && (
                  <div className="p-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400">
                    <CheckCircle size={16} />
                  </div>
                )}
                {toast.type === "info" && (
                  <div className="p-1.5 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400">
                    <Info size={16} />
                  </div>
                )}
              </div>

              {/* Message Content */}
              <div className="flex-1 text-xs md:text-sm font-medium text-white/90 leading-relaxed pr-2 pt-0.5">
                {toast.message}
              </div>

              {/* Close Button Trigger */}
              <button
              title="remove toast"
                type="button"
                onClick={() => removeToast(toast.id)}
                className="text-white/30 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5 shrink-0 mt-0.5"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}