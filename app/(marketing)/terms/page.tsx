import { CircuitBackground } from "@/components/ui/circuit-background";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white py-24 relative">
      <CircuitBackground
        density="low"
        glowColor="#2563EB"
        opacity={0.06}
        className="fixed inset-0 z-0"
      />
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          Terms of Service
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing or using FundAid for Health's grant automation platform, you agree to be
              bound by these Terms of Service. If you disagree with any part of these terms, you may
              not access the service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Description</h2>
            <p className="text-gray-700 leading-relaxed">
              FundAid for Health provides an AI-powered grant writing and automation platform designed
              specifically for healthcare innovators. Our services include company profiling, grant
              discovery, grant analysis, and document generation assistance.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">User Accounts</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you create an account with us, you must:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your password</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Be responsible for all activities under your account</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed">
              You retain ownership of your company information and grant application content.
              By using our service, you grant us a license to process your data to provide our
              AI-powered services. Our platform, including all software, algorithms, and designs,
              remains our intellectual property.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our pricing is as follows:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Stage 1 & 2 (Profile & Discover): Free</li>
              <li>Stage 3 (Grant Analysis): $199 per grant</li>
              <li>Stage 4 (Document Generation): $999 per application</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Payments are processed securely through Stripe. All fees are non-refundable unless
              otherwise stated.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclaimer</h2>
            <p className="text-gray-700 leading-relaxed">
              While we strive to provide accurate grant matching and high-quality application
              assistance, we cannot guarantee grant approval. Final responsibility for grant
              applications lies with the applicant. Our AI-generated content should be reviewed
              and customized before submission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
            <p className="text-gray-700 leading-relaxed">
              We may terminate or suspend your account immediately, without prior notice, for
              conduct that we believe violates these Terms of Service or is harmful to other users,
              us, or third parties.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have questions about these Terms, please contact us at:{" "}
              <a href="mailto:legal@fundaidforhealth.com" className="text-purple-600 hover:underline">
                legal@fundaidforhealth.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
