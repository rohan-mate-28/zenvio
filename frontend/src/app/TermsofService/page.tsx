// This component should be placed in a file like 'app/terms-of-service/page.tsx' 
// if you are using the Next.js App Router.

import React from 'react';

// --- CONFIGURATION ---
// Customize these details for your company
const COMPANY_NAME = "ZenVio Web Pack";
const WEBSITE_URL = "https://www.zenvioweb.in"; // Change to your actual domain
const CONTACT_EMAIL = "contact.zenvio@gmail.com";
const GOVERNING_LAW_STATE = "Maharashtra"; // Example: Your company's legal jurisdiction (State/Province)
const GOVERNING_LAW_COUNTRY = "India"; // Example: Your company's legal jurisdiction (Country)
// --- END CONFIGURATION ---

const TermsOfServicePage: React.FC = () => {
  const lastUpdated = "October 2, 2025"; // Update this date when you make changes

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl font-sans">
      
      {/* HEADER SECTION */}
      <header className="mb-10 border-b pb-4">
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100">
          Terms of Service
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Last Updated: {lastUpdated}
        </p>
      </header>

      {/* INTRODUCTION */}
      <section className="space-y-6 text-gray-700 dark:text-gray-300">
        <p>
          Welcome to {COMPANY_NAME}! These Terms of Service ("Terms") govern your use 
          of our website, <a href={WEBSITE_URL} className="text-blue-600 hover:underline">{WEBSITE_URL}</a> (the "Site"). 
          By accessing or using the Site, you agree to be bound by these Terms.
        </p>
        <p>
          **Note:** These Terms govern your use of this general website. Specific projects and services 
          we provide to clients will be governed by a separate, legally binding **Master Service 
          Agreement (MSA)** or **Project Contract**.
        </p>
      </section>

      {/* SECTION 1: INTELLECTUAL PROPERTY RIGHTS (Your Site Content) */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          1. Intellectual Property
        </h2>
        <p>
          All content, features, and functionality on the Site, including text, graphics, logos, 
          and code, are the exclusive property of {COMPANY_NAME} and are protected by 
          international copyright, trademark, and intellectual property laws.
        </p>
        <p className="mt-3">
          You may not copy, modify, distribute, sell, or lease any part of our services or Site content, 
          nor may you reverse engineer or attempt to extract the source code of the software we use 
          on this Site, unless laws prohibit these restrictions or you have our written permission.
        </p>
      </section>

      {/* SECTION 2: CLIENT PROJECT IP & SERVICE AGREEMENTS (Crucial for a Dev Company) */}
      <section className="mt-10 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-md dark:bg-gray-800 dark:border-blue-400">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          2. Client Projects & Service Agreements
        </h2>
        <ul className="list-disc ml-6 space-y-3 text-gray-700 dark:text-gray-300">
          <li>
            **Project Scope & Deliverables:** The scope of any web development work, 
            deliverables, timelines, and payment terms will be exclusively defined in 
            a dedicated, signed **Master Service Agreement (MSA)** or **Project Contract** between {COMPANY_NAME} and the client.
          </li>
          <li>
            **Intellectual Property (Project Work):** Unless otherwise stipulated in the signed 
            Project Contract, upon final payment, the client is typically granted the rights to the 
            finished website code and content developed specifically for them. We retain the right 
            to use our general coding practices and internal libraries.
          </li>
          <li>
            **Portfolio Use:** We reserve the right to display and link to the completed project 
            for portfolio and marketing purposes, unless a Non-Disclosure Agreement (NDA) 
            prohibits it.
          </li>
        </ul>
      </section>

      {/* SECTION 3: ACCEPTABLE USE & PROHIBITED ACTIVITIES */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          3. Prohibited Activities
        </h2>
        <p>
          You may not access or use the Site for any purpose other than that for which we make 
          the Site available. Prohibited activities include, but are not limited to:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Systematically retrieving data or other content from the Site to create a collection, 
            compilation, database, or directory without written permission.</li>
          <li>Making any unauthorized use of the Site, including collecting usernames and/or 
            email addresses of users to send unsolicited email.</li>
          <li>Interfering with, disrupting, or creating an undue burden on the Site or the networks 
            or services connected to the Site.</li>
          <li>Attempting to bypass any measures of the Site designed to prevent or restrict access 
            to the Site, or any portion of the Site.</li>
        </ul>
      </section>

      {/* SECTION 4: DISCLAIMER OF WARRANTIES & LIMITATION OF LIABILITY */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          4. Disclaimer and Limitation of Liability
        </h2>
        <ul className="list-disc ml-6 space-y-3 text-gray-700 dark:text-gray-300">
          <li>
            **No Warranties:** The Site is provided on an "as-is" and "as-available" basis. We make 
            no warranties regarding the accuracy or completeness of the Site's content.
          </li>
          <li>
            **Limitation of Liability:** In no event will {COMPANY_NAME}, or its directors, employees, 
            or agents, be liable to you or any third party for any direct, indirect, consequential, 
            exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, 
            loss of data, or other damages arising from your use of the Site.
          </li>
        </ul>
      </section>

      {/* SECTION 5: GOVERNING LAW */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          5. Governing Law
        </h2>
        <p>
          These Terms and your use of the Site are governed by and construed in accordance with 
          the laws of the **State/Province of {GOVERNING_LAW_STATE}** in the **Country of {GOVERNING_LAW_COUNTRY}**, 
          without regard to its conflict of law principles.
        </p>
      </section>
      
      {/* SECTION 6: MODIFICATIONS AND INTERRUPTIONS */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          6. Modifications and Interruptions
        </h2>
        <p>
          We reserve the right to change, modify, or remove the contents of the Site at any time 
          or for any reason at our sole discretion without notice. We will not be liable to you or 
          any third party for any modification, price change, suspension, or discontinuance of the Site.
        </p>
      </section>

      {/* CONTACT SECTION */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Contact Us
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          For questions regarding these Terms of Service, please contact us at:
          <br />
          <strong className="text-blue-600 dark:text-blue-400">{CONTACT_EMAIL}</strong>
        </p>
      </section>

    </div>
  );
};

export default TermsOfServicePage;