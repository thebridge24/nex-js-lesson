"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  User,
  Briefcase,
  Target,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Phone,
  Check,
} from "lucide-react";

interface DiscoveryFormData {
  clientName: string;
  businessName: string;
  email: string;
  phone: string;
  whatTheyNeed: string[];
  goals: string;
  budget: string;
  timeline: string;
  referenceWebsites: string;
}
// Core services — written in simple business-friendly language
const SERVICE_OPTIONS = [
  "Business Website Design",
  "Company Portfolio Website",
  "E-commerce Website",
  "Custom Web Application Development",
  "Website Redesign & Modernization",
  "Landing Page Design",
  "Frontend Website Development",
  "UI/UX Design for Mobile & Web Apps",
  "Admin Dashboard Development",
  "Booking & Reservation Systems",
  "Digital Menu Websites for Restaurants",
  "School Management Systems",
  "Hospital & Clinic Websites",
  "Real Estate Websites",
  "Logistics & Delivery Platforms",
  "Inventory & Business Management Systems",
  "Website Maintenance & Support",
  "Website Speed & Performance Optimization",
];

// Screened out anything less than 500k
const BUDGET_OPTIONS = [
  "₦500,000 - ₦1,500,000",
  "₦1,500,000 - ₦3,000,000",
  "₦3,000,000 - ₦5,000,000",
  "₦5,000,000 - ₦10,000,000",
  "₦10,000,000 - ₦20,000,000",
  "₦20,000,000+",
];

const TIMELINE_OPTIONS = [
  "Urgent (Less than 2 weeks)",
  "About 1 Month",
  "2 to 3 Months",
  "Flexible / Long-term",
];

export default function ClientDiscoveryForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    clientName: "",
    businessName: "",
    email: "",
    phone: "",
    whatTheyNeed: [] as string[],
    goals: "",
    budget: "",
    timeline: "",
    referenceWebsites: "",
  });

  const updateField = <K extends keyof DiscoveryFormData>(key: K, value: DiscoveryFormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const toggleService = (service: string) => {
    const current = formData.whatTheyNeed;
    if (current.includes(service)) {
      updateField(
        "whatTheyNeed",
        current.filter((s) => s !== service),
      );
    } else {
      updateField("whatTheyNeed", [...current, service]);
    }
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  // Validation function to physically protect step access
  const isStepInvalid = () => {
    switch (step) {
      case 1:
        return !formData.clientName.trim() || !formData.businessName.trim();
      case 2:
        return !formData.email.trim() || !formData.phone.trim();
      case 3:
        return formData.whatTheyNeed.length === 0 || !formData.goals.trim();
      case 4:
        return !formData.budget || !formData.timeline;
      default:
        return false;
    }
  };

  // Completely resets state when going back home
  const handleReset = () => {
    setFormData({
      clientName: "",
      businessName: "",
      email: "",
      phone: "",
      whatTheyNeed: [],
      goals: "",
      budget: "",
      timeline: "",
      referenceWebsites: "",
    });
    setStep(1);
    setIsSubmitted(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isStepInvalid()) return; // Hard wall security check

    setIsSubmitting(true);
    // Simulate processing handshake
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const slideVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3, ease: "easeIn" } },
  };

  return (
    <main className="min-h-screen bg-black font-sans text-white flex flex-col items-center justify-center p-4 md:px-6 py-12 relative overflow-hidden">
      {/* Background Lighting Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[50%] bg-[#FF1A1A]/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#990000]/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-2xl relative z-10">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FF1A1A]/30 bg-[#FF1A1A]/5 mb-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#FF1A1A]">
              Client Discovery
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
            Let{`'`}s Plan Your <span className="text-[#FF1A1A]">Project</span>
          </h1>
          <p className="text-white/50 text-sm mt-2 max-w-sm mx-auto">
            Answer a few simple questions so we can understand your design and
            build requirements.
          </p>
        </div>

        {/* Progress Tracker */}
        {!isSubmitted && (
          <div className="w-full h-0.5 bg-white/10 mb-8 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#FF1A1A]"
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}

        {/* Form Body Container */}
        <div className="bg-[#111111]/70 backdrop-blur-2xl border border-white/10 rounded-4xl p-6 md:p-10 shadow-2xl relative">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              /* Success Messaging Layer */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-6"
              >
                <div className="w-20 h-20 bg-[#FF1A1A] rounded-full flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(255,26,26,0.3)]">
                  <CheckCircle2 size={40} className="text-white" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Form Submitted Successfully!
                  </h2>
                  <p className="text-white/60 text-sm max-w-md mx-auto">
                    Thank you, {formData.clientName}. We have received your
                    project details safely. Our team will review your
                    information and get back to you within 24 hours.
                  </p>
                </div>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-[#FF1A1A] hover:text-white transition-colors text-sm"
                  >
                    Return Home
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* STEP 1: Basic Info */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    variants={slideVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3 border-b border-white/10 pb-3 mb-2">
                      <User className="text-[#FF1A1A]" size={20} />
                      <h3 className="font-medium text-lg">About You</h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-white/40 mb-2 font-medium">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.clientName}
                          onChange={(e) =>
                            updateField("clientName", e.target.value)
                          }
                          placeholder="Enter your name"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#FF1A1A] focus:bg-white/8 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-white/40 mb-2 font-medium">
                          Company or Business Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.businessName}
                          onChange={(e) =>
                            updateField("businessName", e.target.value)
                          }
                          placeholder="Enter your company name"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#FF1A1A] focus:bg-white/8 transition-all"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Contact Info */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    variants={slideVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3 border-b border-white/10 pb-3 mb-2">
                      <Phone className="text-[#FF1A1A]" size={20} />
                      <h3 className="font-medium text-lg">
                        Contact Information
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-white/40 mb-2 font-medium">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          placeholder="example@domain.com"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#FF1A1A] focus:bg-white/8 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-white/40 mb-2 font-medium">
                          Phone / WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => updateField("phone", e.target.value)}
                          placeholder="Enter phone number"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#FF1A1A] focus:bg-white/8 transition-all"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: Project Requirements */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    variants={slideVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3 border-b border-white/10 pb-3 mb-2">
                      <Briefcase className="text-[#FF1A1A]" size={20} />
                      <h3 className="font-medium text-lg">Project Details</h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-white/40 mb-3 font-medium">
                          What services do you need from us? (Select Multiple) *
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                          {SERVICE_OPTIONS.map((service) => {
                            const isSelected =
                              formData.whatTheyNeed.includes(service);
                            return (
                              <button
                                type="button"
                                key={service}
                                onClick={() => toggleService(service)}
                                className={`p-4 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                                  isSelected
                                    ? "bg-[#FF1A1A]/10 border-[#FF1A1A] text-white"
                                    : "bg-white/5 border-white/10 text-white/60 hover:border-white/30"
                                }`}
                              >
                                {service}
                                {isSelected && (
                                  <Check className="size-4 rounded-full text-[#FF1A1A]" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="mt-8">
                        <label className="block text-xs uppercase tracking-wider text-white/40 mb-2 font-medium">
                          What are the main goals of this project? *
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={formData.goals}
                          onChange={(e) => updateField("goals", e.target.value)}
                          placeholder="Please briefly explain what you want your website or app to do..."
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#FF1A1A] focus:bg-white/8 transition-all resize-none"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: Parameters */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    variants={slideVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3 border-b border-white/10 pb-3 mb-2">
                      <Target className="text-[#FF1A1A]" size={20} />
                      <h3 className="font-medium text-lg">Budget & Timeline</h3>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-white/40 mb-3 font-medium">
                          Estimated Project Budget *
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {BUDGET_OPTIONS.map((budget) => (
                            <button
                              type="button"
                              key={budget}
                              onClick={() => updateField("budget", budget)}
                              className={`px-4 py-2.5 rounded-lg border text-xs transition-all ${
                                formData.budget === budget
                                  ? "bg-white text-black border-white font-semibold"
                                  : "bg-white/5 border-white/10 text-white/70 hover:border-white/30"
                              }`}
                            >
                              {budget}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-white/40 mb-3 font-medium">
                          When do you want this to launch? *
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {TIMELINE_OPTIONS.map((time) => (
                            <button
                              type="button"
                              key={time}
                              onClick={() => updateField("timeline", time)}
                              className={`px-4 py-2.5 rounded-lg border text-xs transition-all ${
                                formData.timeline === time
                                  ? "bg-white text-black border-white font-semibold"
                                  : "bg-white/5 border-white/10 text-white/70 hover:border-white/30"
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-white/40 mb-2 font-medium">
                          Example Websites You Like (Optional)
                        </label>
                        <input
                          type="text"
                          value={formData.referenceWebsites}
                          onChange={(e) =>
                            updateField("referenceWebsites", e.target.value)
                          }
                          placeholder="e.g., example.com, competitor.com"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#FF1A1A] focus:bg-white/8 transition-all"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Actions & Buttons Footer Layer */}
                <div className="flex flex-col-reverse sm:flex-row items-center justify-between pt-6 border-t border-white/5 mt-4">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex items-center gap-2 text-xs font-semibold text-white/60 hover:text-white transition-colors px-4 py-2"
                    >
                      <ArrowLeft size={16} /> Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 4 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={isStepInvalid()}
                      className="flex items-center gap-2 text-xs font-semibold px-5 py-3 bg-[#FF1A1A] hover:bg-[#C00000] text-white rounded-xl transition-all disabled:opacity-30 disabled:pointer-events-none"
                    >
                      Continue <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting || isStepInvalid()}
                      className="flex items-center gap-2 text-xs font-bold px-6 py-3 bg-white text-black hover:bg-[#FF1A1A] hover:text-white rounded-xl transition-all disabled:opacity-30 disabled:pointer-events-none"
                    >
                      {isSubmitting ? (
                        <>
                          Submitting...{" "}
                          <Loader2 size={16} className="animate-spin" />
                        </>
                      ) : (
                        <>
                          Submit Details <CheckCircle2 size={16} />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
