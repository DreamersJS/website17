import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4 text-gray-700">
        This Privacy Policy explains how we collect, use, and protect your personal information. By using this website, you consent to the practices described below.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Information We Collect</h2>
      <ul className="list-disc list-inside text-gray-700">
        <li>Name, email, phone number, shipping address</li>
        <li>Order history and preferences</li>
        <li>Payment details (processed securely by our payment providers)</li>
        <li>Website usage data (IP address, device type, cookies)</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">How We Use Your Information</h2>
      <ul className="list-disc list-inside text-gray-700">
        <li>To fulfill and manage your orders</li>
        <li>To provide customer support and personalized product recommendations</li>
        <li>To send occasional promotional emails (you can unsubscribe anytime)</li>
        <li>To improve our website and services</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Cookies</h2>
      <p className="text-gray-700">
        We use cookies to enhance your browsing experience. These help us remember your preferences and analyze website traffic. You can control cookies through your browser settings.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Data Security</h2>
      <p className="text-gray-700">
        We implement strict security measures to keep your data safe. Payments are processed securely via trusted third-party providers.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Third-Party Disclosure</h2>
      <p className="text-gray-700">
        We do not sell your personal data. Your information may be shared only with partners necessary for order processing (e.g., payment processors, shipping carriers).
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Your Rights</h2>
      <p className="text-gray-700">
        You have the right to access, correct, or delete your personal data. Contact us at [your email] for any privacy requests.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Changes to This Policy</h2>
      <p className="text-gray-700">
        We may update this policy as needed. Updates will be posted here with a revised date.
      </p>

      <p className="mt-6 text-gray-700">Effective Date: [02.07.2025]</p>
    </div>
  );
};

export default PrivacyPolicy;
