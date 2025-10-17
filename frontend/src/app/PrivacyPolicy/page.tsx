// This component should be placed in a file like 'app/privacy-policy/page.tsx' 
// if you are using the Next.js App Router.

import React from 'react';

// --- CONFIGURATION ---
// Customize these details for your company
const COMPANY_NAME = "ZenVio Web Pack";
const WEBSITE_URL = "https://www.zenvioweb.in"; // Change to your actual domain
const CONTACT_EMAIL = "contact.zenvio@gmail.com";
 // --- END CONFIGURATION ---

const PrivacyPolicyPage: React.FC = () => {
  const lastUpdated = "October 2, 2025"; // Update this date when you make changes

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl font-sans">
      
      {/* HEADER SECTION */}
      <header className="mb-10 border-b pb-4">
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Last Updated: {lastUpdated}
        </p>
      </header>

      {/* INTRODUCTION */}
      <section className="space-y-6 text-gray-700 dark:text-gray-300">
        <p>
          This Privacy Policy describes how <strong>{COMPANY_NAME}</strong> ("we," "us," or "our") 
          collects, uses, and discloses your personal information when you visit or make an 
          inquiry through our website, <a href={WEBSITE_URL} className="text-blue-600 hover:underline">{WEBSITE_URL}</a> (the "Site"). 
          By using our Site, you agree to the collection and use of information in accordance with this policy.
        </p>
      </section>

      {/* SECTION 1: INFORMATION WE COLLECT */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          1. Information We Collect
        </h2>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Information You Directly Provide</h3>
          <p>
            We collect personal information that you voluntarily provide to us when you express an 
            interest in obtaining information about our services, participate in activities on the Site, 
            or otherwise contact us.
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>Contact Data:</strong> Your name, email address, phone number.</li>
            <li><strong>Project Data:</strong> Details about your proposed website project, business needs, and budget.</li>
          </ul>

          <h3 className="text-xl font-semibold pt-4">Information Collected Automatically</h3>
          <p>
            We automatically collect certain information when you visit, use, or navigate the Site. 
            This information does not reveal your specific identity but may include device and usage information.
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li>IP address, browser and device characteristics, operating system.</li>
            <li>Usage data (pages viewed, time spent on pages, actions taken).</li>
            <li>Data collected via cookies and similar tracking technologies (e.g., Google Analytics).</li>
          </ul>
        </div>
      </section>

      {/* SECTION 2: HOW WE USE YOUR INFORMATION */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          2. How We Use Your Information
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          We use the personal information collected for various purposes:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>To **Fulfill Service Requests** and provide the web development services you inquire about.</li>
          <li>To **Respond to Inquiries** and offer technical or client support.</li>
          <li>To **Improve Our Site** and services through analysis of usage data.</li>
          <li>For **Marketing Communications** (with your consent) to inform you of new services or promotions.</li>
        </ul>
      </section>

      {/* SECTION 3: SHARING YOUR PERSONAL INFORMATION */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          3. Sharing Your Personal Information
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          We only share and disclose your information in the following situations:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li><strong>With Vendors, Consultants, and Third-Party Service Providers</strong> who perform services for us (e.g., email service, hosting, analytics).</li>
          <li><strong>For Legal Reasons</strong> to comply with laws, governmental requests, legal proceedings, and court orders.</li>
          <li><strong>For Business Transfers</strong> in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business.</li>
        </ul>
      </section>

      {/* CRITICAL SECTION 4: OUR ROLE AS A DEVELOPER */}
      <section className="mt-10 p-6 bg-yellow-50 border-l-4 border-yellow-500 rounded-md dark:bg-gray-800 dark:border-yellow-400">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          4. Our Role as a Website Developer
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          As a web development agency, we build and deploy websites for clients. 
          **We are not responsible for the content, data collection, or privacy practices of the websites we create.**
        </p>
        <p className="mt-3 text-gray-700 dark:text-gray-300">
          Any website developed by {COMPANY_NAME} is governed by its own Privacy Policy, which is the 
          sole responsibility of the respective website owner (our client). If you have questions about the 
          data collected on a website we have developed, please contact the owner of that website directly.
        </p>
      </section>

      {/* SECTION 5: YOUR PRIVACY RIGHTS */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          5. Your Privacy Rights
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          Depending on your location, you may have the right to request access to and correction of your personal data, 
          and to object to its processing. To exercise these rights, please contact us using the details below.
        </p>
      </section>

      {/* CONTACT SECTION */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Contact Us
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          If you have questions or comments about this policy, you may email us at:
          <br />
          <strong className="text-blue-600 dark:text-blue-400">{CONTACT_EMAIL}</strong>
          <br />
          
           
        </p>
      </section>

    </div>
  );
};

export default PrivacyPolicyPage;