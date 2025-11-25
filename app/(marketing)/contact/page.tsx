"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { DNABackground } from "@/components/ui/dna-background";
import {
  Mail,
  MessageSquare,
  Phone,
  Send,
  Linkedin,
  Twitter,
  Github,
} from "lucide-react";

export default function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };

    if (name === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        newErrors.email = 'Please enter a valid email address';
      } else {
        delete newErrors.email;
      }
    }

    if (name === 'message' && value && value.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    } else if (name === 'message') {
      delete newErrors.message;
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      company: "",
      subject: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateField(name, value);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Get in touch via email for support and inquiries",
      contact: "hello@fundaidforhealth.com",
      href: "mailto:hello@fundaidforhealth.com",
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Chat with our team during business hours",
      contact: "Available 9 AM - 5 PM EST",
      href: "#",
    },
    {
      icon: Phone,
      title: "Phone",
      description: "Speak directly with our sales team",
      contact: "+1 (555) 123-4567",
      href: "tel:+15551234567",
    },
  ];

  const faqs = [
    {
      question: "What types of healthcare companies do you serve?",
      answer:
        "We specialize in biotech, medtech, digital health, diagnostics, therapeutics, and medical device companies seeking NIH, FDA, and CDC grant funding.",
    },
    {
      question: "How long does the healthcare grant process take?",
      answer:
        "From start to submission, most NIH and FDA applications take 10-14 days. Our AI-powered system significantly reduces traditional 4-6 week timelines.",
    },
    {
      question: "What's your success rate for healthcare grants?",
      answer:
        "Our healthcare customers achieve a 40% win rate, more than double the industry average of 18% for NIH SBIR/STTR grants. Success depends on grant fit, TRL level, and clinical validation.",
    },
    {
      question: "Do you handle FDA regulatory requirements?",
      answer:
        "Yes! Our platform includes FDA compliance checking, regulatory pathway assessment, and clinical trial planning support built into our Pro and Enterprise tiers.",
    },
  ];

  return (
    <div className="min-h-screen relative">
      {/* DNA Background */}
      <DNABackground
        density="medium"
        glowColor="#14B8A6"
        pattern="molecular"
        opacity={0.12}
        className="fixed inset-0 z-0"
      />

      {/* Hero Section - White */}
      <section className="section-light py-24 md:py-32 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            <Badge className="bg-black text-white px-4 py-2 text-sm badge-pulse">
              Contact Us
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl heading-black max-w-4xl mx-auto">
              Let's <span className="accent-underline">talk</span> about your grant goals
            </h1>
            <p className="text-xl md:text-2xl body-black max-w-3xl mx-auto">
              Our healthcare grant specialists are here to answer questions, provide demos, and help you
              secure the NIH, FDA, and CDC funding you need.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods - Black */}
      <section className="section-dark py-24 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a href={method.href} className="block h-full">
                    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 h-full hover:border-accent transition-colors card-hover-lift">
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {method.title}
                      </h3>
                      <p className="text-sm text-gray-300 mb-4">
                        {method.description}
                      </p>
                      <div className="text-sm font-medium text-accent">
                        {method.contact}
                      </div>
                    </div>
                  </a>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form Section - White */}
      <section className="section-light py-24 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-sm">
                <h2 className="text-3xl heading-black mb-6">Send us a message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="border-gray-300"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      className="border-gray-300"
                      aria-invalid={errors.email ? "true" : "false"}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                      <div id="email-error" className="text-red-600 text-sm mt-1" role="alert">
                        {errors.email}
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Company
                    </label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Acme Corp"
                      className="border-gray-300"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Grant application question"
                      className="border-gray-300"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="flex w-full rounded-md border border-gray-300 bg-white text-black placeholder:text-gray-500 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-0 hover:border-gray-400 px-3 py-2 text-base transition-all duration-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      placeholder="Tell us about your healthcare grant funding needs..."
                      aria-invalid={errors.message ? "true" : "false"}
                      aria-describedby={errors.message ? "message-error" : undefined}
                    />
                    {errors.message && (
                      <div id="message-error" className="text-red-600 text-sm mt-1" role="alert">
                        {errors.message}
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-accent hover:bg-accent-hover text-white btn-magnetic"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2 icon-hover" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* FAQ */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl heading-black mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm"
                  >
                    <h3 className="text-lg font-semibold text-black mb-3">
                      {faq.question}
                    </h3>
                    <p className="body-black">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-12 bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold text-black mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 hover:text-accent hover:border-accent transition-all"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 hover:text-accent hover:border-accent transition-all"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 hover:text-accent hover:border-accent transition-all"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section - Black */}
      <section className="section-dark py-24 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center space-y-8 bg-gray-900 border border-gray-800 p-12 rounded-2xl"
          >
            <h2 className="text-4xl heading-white">Ready to get started?</h2>
            <p className="text-xl body-white">
              Try our free Company Profiler and Grant Discovery tools today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sign-up">
                <Button size="lg" className="bg-accent hover:bg-accent-hover text-white btn-magnetic">
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" size="lg" className="btn-magnetic hover-glow">
                  View Pricing
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
