import React from "react";
import { Mail, Phone, Clock, HelpCircle } from "lucide-react";

const SupportPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-4 py-12">
      {/* Heading */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold text-green-600 dark:text-green-400 mb-4">
          Customer Support
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          We're here to help with all your car-related questions and concerns.
        </p>
      </div>

      {/* Support Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Email */}
        <div className="bg-green-100 dark:bg-green-800 p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <Mail className="text-green-600 dark:text-green-300 mb-4" size={32} />
          <h2 className="text-xl font-semibold mb-2">Email Us</h2>
          <p className="text-sm">
            Send us your query anytime at <br />
            <span className="font-medium text-green-700 dark:text-green-200">support@ecodrive.com</span>
          </p>
        </div>

        {/* Phone */}
        <div className="bg-green-100 dark:bg-green-800 p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <Phone className="text-green-600 dark:text-green-300 mb-4" size={32} />
          <h2 className="text-xl font-semibold mb-2">Call Us</h2>
          <p className="text-sm">
            Available: Mon–Sat, 9AM to 7PM <br />
            <span className="font-medium text-green-700 dark:text-green-200">+91 9876543210</span>
          </p>
        </div>

        {/* Hours */}
        <div className="bg-green-100 dark:bg-green-800 p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <Clock className="text-green-600 dark:text-green-300 mb-4" size={32} />
          <h2 className="text-xl font-semibold mb-2">Working Hours</h2>
          <p className="text-sm">
            Monday to Saturday: 9AM – 7PM <br />
            Sunday: Closed
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16 max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <HelpCircle className="mx-auto text-green-600 dark:text-green-400" size={36} />
          <h2 className="text-2xl font-bold mt-2">Frequently Asked Questions</h2>
        </div>
        <ul className="space-y-4 text-left">
          <li>
            <strong>Q:</strong> How do I list my car for sale? <br />
            <strong>A:</strong> Go to the Sell section, fill out your car details, and submit. Our team will verify and list your car.
          </li>
          <li>
            <strong>Q:</strong> What documents do I need to buy a car? <br />
            <strong>A:</strong> You need a valid ID, address proof, and your driving license.
          </li>
          <li>
            <strong>Q:</strong> Can I schedule a test drive? <br />
            <strong>A:</strong> Yes, many dealers offer test drives. Use the "Request Test Drive" option on the car’s page.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SupportPage;
