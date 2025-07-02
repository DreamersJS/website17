import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">About Us</h1>

      <p className="mb-4 text-lg">
        We are proud Herbalife Nutrition Independent Distributors with over 20 years of experience helping people achieve their wellness goals. Whether you're looking to lose weight, improve nutrition, or boost your overall vitality — we're here to support you every step of the way.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">What Herbalife Offers</h2>
      <ul className="list-disc list-inside mb-4 text-lg space-y-1">
        <li>Successful weight management solutions</li>
        <li>Science-backed nutrition programs</li>
        <li>Advanced personal care products</li>
        <li>Business opportunities through product retailing</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Science-Backed, Expert-Driven</h2>
      <p className="mb-4 text-lg">
        Herbalife’s products are developed by renowned scientists and nutritionists, including Nobel Laureate Dr. Lou Ignarro. The Nutrition Advisory Board (NAB), led by Professor David Heber, Ph.D., ensures all products meet the highest scientific and regulatory standards.
      </p>

      <p className="mb-4 text-lg">
        Our commitment to research is reflected in the Mark Hughes Cellular and Molecular Nutrition Lab at UCLA* and our state-of-the-art Herbalife Product and Science Centre in Los Angeles.
      </p>

      <p className="mb-4 text-sm italic">
        *The University of California, Los Angeles does not endorse specific products or services.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Product Safety & Quality</h2>
      <p className="mb-4 text-lg">
        Herbalife ensures product safety through strict sourcing, formulation, testing, and labeling processes. Raw materials are thoroughly reviewed and tested in certified facilities across the US, Europe, and Asia to meet national and international standards.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Support Network</h2>
      <p className="mb-4 text-lg">
        With over 1.9 million Independent Distributors in more than 80 countries, Herbalife offers a global support system. Whether you're working on nutrition, weight loss, or launching your own business, you’re never alone.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Popular Products</h2>
      <p className="mb-4 text-lg">
        Our best-selling products include:
        <Link to="/products/16" className="text-blue-600 underline ml-1">Vitamins</Link>, 
        <Link to="/products/23" className="text-blue-600 underline ml-1">Herbal Aloe Concentrate</Link>, 
        and 
        <Link to="/products/22" className="text-blue-600 underline ml-1">Formula 3 Personalized Protein Powder</Link>.
      </p>

      <p className="mb-4 text-lg">
        And of course, our flagship 
        <Link to="/products/9" className="text-blue-600 underline ml-1">Formula 1 Shake</Link> — a delicious, balanced meal replacement packed with protein, fiber, vitamins, and minerals, designed for busy lifestyles.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Ready to Start?</h2>
      <p className="text-lg">
        Whether you're looking to improve your health or explore a new business opportunity, we're here to help. 
        <Link to="/contact" className="text-blue-600 underline ml-1">Get in touch</Link> and take your first step toward better wellness today.
      </p>
    </div>
  );
};

export default About;
