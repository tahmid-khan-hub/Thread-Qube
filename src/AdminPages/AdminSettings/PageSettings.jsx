import React from "react";
import { Link } from "react-router";

const PageSettings = () => {
  const legalPages = [
    { id: "terms-and-conditions", title: "Terms and Conditions" },
    { id: "privacy-and-policy", title: "Privacy and Policy" },
  ];

  return (
      <div className="p-6 space-y-8">

        {/* Legal Section */}
        <div  className="bg-base-200 rounded-xl p-6 shadow">
          <h3 className="text-xl font-semibold mb-4">Legal</h3>
          <p className="text-sm text-gray-500 mb-4">
            Manage your site’s legal documents like terms and privacy.
          </p>

          <ul className="space-y-2">
            {legalPages.map((page) => (
              <li key={page.id}>
                <Link
                  to={`/editPage/${page.id}`}
                  className="text-blue-600 hover:underline hover:text-blue-800 text-[15px]"
                >
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* More sections like Social Links can be added here later */}
      </div>
  );
};

export default PageSettings;
