"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#b38f2e]">
          Atelier Concierge
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#800020]">
          Connect With Our Saree Specialists
        </h1>
        <p className="text-xs sm:text-sm text-gray-600">
          Book private bridal appointments, request custom weave colors, or inquire about wholesale orders.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#ebe4d5] shadow-xs space-y-4">
            <h3 className="text-base font-serif font-bold text-[#800020]">
              Flagship Atelier Showroom
            </h3>
            
            <div className="space-y-4 text-xs text-gray-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#d4af37] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Banani Atelier:</p>
                  <p>House 48, Road 11, Block D, Banani, Dhaka - 1213</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#d4af37] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Dhanmondi Lounge:</p>
                  <p>Plot 27, Road 27 (Old), Dhanmondi, Dhaka - 1209</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#d4af37] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Telephone / WhatsApp Helpline:</p>
                  <p>+880 1800-SAREE (72733) / +880 1711-000000</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#d4af37] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Client Inquiries:</p>
                  <p>concierge@royalsaree.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#d4af37] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Opening Hours:</p>
                  <p>Saturday – Thursday: 10:00 AM – 9:00 PM</p>
                  <p>Friday: 3:00 PM – 9:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white p-8 rounded-2xl border border-[#ebe4d5] shadow-xs space-y-4">
            <h3 className="text-lg font-serif font-bold text-[#800020]">
              Send an Atelier Inquiry
            </h3>

            {submitted ? (
              <div className="p-6 bg-green-50 rounded-xl border border-green-200 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto" />
                <h4 className="text-sm font-serif font-bold text-green-900">
                  Message Dispatched Successfully
                </h4>
                <p className="text-xs text-green-700">
                  Thank you. Our bridal consultant will reach out to you within 2 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Nusrat Jahan"
                      className="w-full p-3 rounded-lg border border-[#ebe4d5] bg-[#faf7f2]"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="01XXXXXXXXX"
                      className="w-full p-3 rounded-lg border border-[#ebe4d5] bg-[#faf7f2]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="youremail@example.com"
                    className="w-full p-3 rounded-lg border border-[#ebe4d5] bg-[#faf7f2]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Inquiry Type</label>
                  <select className="w-full p-3 rounded-lg border border-[#ebe4d5] bg-[#faf7f2]">
                    <option>Bridal Consultation Appointment</option>
                    <option>Order & Consignment Status</option>
                    <option>Custom Handloom Weave Request</option>
                    <option>Wholesale & Export Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your saree requirements, preferred colors, or wedding dates..."
                    className="w-full p-3 rounded-lg border border-[#ebe4d5] bg-[#faf7f2]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#800020] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#580c1f] transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message to Concierge</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
