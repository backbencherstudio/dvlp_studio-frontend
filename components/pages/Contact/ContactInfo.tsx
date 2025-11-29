import { Clock, Mail, MapPin, Phone } from "lucide-react";
import React from "react";

export default function ContactInfo() {
  return (
    <div className="p-8">
      <h3 className="text-3xl font-bold leading-9 mb-8">Contact Information</h3>
      <div className="space-y-10 ">
        {/* 1. email us */}
        <div className="flex items-start gap-4">
          {/* icon */}
          <div className="flex items-center justify-center p-4 bg-gradient-to-r from-[#6366F1] to-[#A855F7] rounded-2xl text-white">
            <Mail />
          </div>

          {/* info */}
          <div>
            <p className="text-slate-800  text-lg font-semibold leading-7">
              Email Us
            </p>
            <p className="text-[#4B5563]">support@evolvetutoring.ai</p>
          </div>
        </div>
        {/* 1. email us */}
        <div className="flex items-start gap-4">
          {/* icon */}
          <div className="flex items-center justify-center p-4 bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] rounded-2xl text-white">
            <Phone />
          </div>

          {/* info */}
          <div>
            <p className="text-slate-800  text-lg font-semibold leading-7">
              Call Us
            </p>
            <p className="text-[#4B5563]">(707)200-8004</p>
            <p className="text-[#4B5563]">Everyday, 8 AM - 8 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
}
