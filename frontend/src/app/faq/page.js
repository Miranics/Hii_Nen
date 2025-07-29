"use client";

import Link from "next/link";
import Navbar from "../../components/Navbar";
import { useState } from "react";
import { Rocket, Funding } from "../../components/icons/ProfessionalIcons";

export default function FAQPage() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "What is HiiNen?",
      answer: "HiiNen is your AI Co-Founder designed to help entrepreneurs transform their ideas into successful startups. We provide AI-powered ideation, validation tools, mentorship connections, funding guidance, and comprehensive analytics to support your entire startup journey."
    },
    {
      question: "How does the AI Co-Founder work?",
      answer: "Our AI Co-Founder uses advanced machine learning algorithms to analyze market trends, validate business ideas, and provide personalized recommendations. It acts as your intelligent partner, offering insights based on successful startup patterns and real-time market data."
    },
    {
      question: "Is HiiNen free to use?",
      answer: "Yes! HiiNen offers a comprehensive free tier that includes basic AI ideation, idea validation, and access to our mentor network. We also offer premium plans with advanced features like detailed market analysis, priority mentor matching, and enhanced analytics."
    },
    {
      question: "Who can use HiiNen?",
      answer: "HiiNen is designed for aspiring entrepreneurs, early-stage startup founders, business students, and anyone looking to turn their ideas into reality. Whether you're a first-time entrepreneur or a serial founder, our platform adapts to your experience level."
    },
    {
      question: "How do you match mentors?",
      answer: "Our AI algorithm analyzes your startup idea, industry, experience level, and goals to match you with the most relevant mentors. We consider factors like industry expertise, geographical location, previous startup experience, and mentoring style to ensure the best fit."
    },
    {
      question: "What kind of validation does HiiNen provide?",
      answer: "We offer comprehensive validation including market size analysis, competitor research, customer demand assessment, feasibility studies, and risk analysis. Our AI provides scoring and recommendations to help you refine your idea before investing significant resources."
    },
    {
      question: "Can HiiNen help with funding?",
      answer: "Absolutely! We provide funding readiness assessments, pitch deck templates, investor matching services, and guidance through the entire fundraising process. Our platform connects you with angel investors, VCs, and alternative funding sources."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we take data security very seriously. All your ideas, business plans, and personal information are encrypted and stored securely. We never share your proprietary information without your explicit consent, and you maintain full ownership of your intellectual property."
    },
    {
      question: "How do I get started?",
      answer: "Getting started is simple! Sign up for a free account, complete your entrepreneur profile, and begin by sharing your startup idea or generating new ones with our AI. The platform will guide you through each step of the validation and development process."
    },
    {
      question: "Do you support international entrepreneurs?",
      answer: "Yes! While HiiNen was initially designed with African entrepreneurs in mind, we support founders from around the world. Our mentor network and resources span globally, and our AI provides insights relevant to various international markets."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-blue-900">
      <Navbar />
      
      <main className="px-8 py-12">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors font-medium"
            >
              ← Back to Home
            </Link>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900 dark:text-white animate-fadeInUp">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto animate-fadeInUp stagger-delay-1">
            Find answers to common questions about HiiNen and how our AI Co-Founder can help you build a successful startup.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden animate-fadeInUp"
                style={{ animationDelay: `${(index + 2) * 0.1}s` }}
              >
                <button
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    <span className={`text-2xl transition-transform duration-200 ${openFAQ === index ? 'rotate-180' : ''}`}>
                      {openFAQ === index ? '⬆️' : '⬇️'}
                    </span>
                  </div>
                </button>
                
                {openFAQ === index && (
                  <div className="px-8 pb-6 animate-fadeInUp">
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Additional Help Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg text-center animate-fadeInUp" style={{ animationDelay: '1.2s' }}>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Still have questions?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Can't find the answer you're looking for? Our support team is here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 font-semibold"
              >
                <span>💬</span>
                Contact Support
              </Link>
              <Link 
                href="/demo"
                className="flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-semibold"
              >
                <span>🚀</span>
                Try Demo
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center animate-fadeInUp" style={{ animationDelay: '1.3s' }}>
              <div className="flex justify-center mb-3">
                <Rocket className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">1000+</div>
              <div className="text-gray-600 dark:text-gray-400">Startups Launched</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center animate-fadeInUp" style={{ animationDelay: '1.4s' }}>
              <div className="text-3xl mb-3">👥</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">500+</div>
              <div className="text-gray-600 dark:text-gray-400">Expert Mentors</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center animate-fadeInUp" style={{ animationDelay: '1.5s' }}>
              <div className="flex justify-center mb-3">
                <Funding className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">$50M+</div>
              <div className="text-gray-600 dark:text-gray-400">Funding Raised</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
