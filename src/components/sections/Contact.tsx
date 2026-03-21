"use client";

import { ContactSection as ContactData } from "@/types/portfolio";
import { Mail, Send, CheckCircle } from "lucide-react";

interface ContactProps {
  data: ContactData;
}

export default function Contact({ data }: ContactProps) {
  return (
    <section id="contact" className="section-padding">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-mono font-medium mb-2 uppercase tracking-widest">
            {"// get_in_touch"}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Contact Me</h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="card-glass p-8 text-center">
            {/* Availability badge */}
            {data.availableForWork && (
              <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 rounded-full px-4 py-1.5 mb-6">
                <CheckCircle className="w-4 h-4 text-teal-400" />
                <span className="text-sm text-teal-400 font-medium">
                  Available for work
                </span>
              </div>
            )}

            {/* Message */}
            {data.message && (
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                {data.message}
              </p>
            )}

            {/* Email CTA */}
            <a
              href={`mailto:${data.email}`}
              className="inline-flex items-center gap-3 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg shadow-indigo-500/25 mb-8"
            >
              <Mail className="w-5 h-5" />
              {data.email}
              <Send className="w-4 h-4" />
            </a>

            {data.preferredContact && (
              <p className="text-slate-500 text-sm">
                Preferred contact:{" "}
                <span className="text-slate-400 capitalize">{data.preferredContact}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
