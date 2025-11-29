import ArrowIcon from "@/components/icons/ArrowIcon";
import SparkIcon from "@/components/icons/SparkIcon";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div>
      <PolicyHero />
      <LegalPage/>
    </div>
  );
}

function PolicyHero() {
  return (
    <section className="lg:pt-56 md:pt-40 pt-36 lg:pb-30 md:pb-20 pb-12 shrink-0 [background:linear-gradient(135deg,rgba(49,46,129)_0%,rgba(88,28,135)_50%,rgba(131,24,67)_100%)] relative">
      {/* content */}
      <div className="flex flex-col items-center justify-center relative z-20">
        <div className="mb-[21.34px] [background:rgba(255,255,255,0.10)] backdrop-blur-[5px] px-[24.66px] py-[12.67px] rounded-full border-solid border-[rgba(255,255,255,0.20)] flex gap-2 items-center ">
          <span className="text-[#FACC15]">
            <SparkIcon />
          </span>
          <span className="text-sm font-medium leading-5 text-white">
            Legal Information
          </span>
        </div>

        <h1 className="mt-4 text-[40px] shrink-0 text-white text-center font-black lg:leading-[96px] md:leading-[60px] leading-12 lg:text-8xl mb-1.5 sm:text-[40px] md:text-5xl">
          <span>Your Privacy & Protection</span>
          <br />
          <span className="bg-gradient-to-r from-[#FACC15] via-[#F472B6] to-[#60A5FA] bg-clip-text text-transparent">
            Matters to Us
          </span>
        </h1>

        <p className="font-normal leading-8 max-w-[854.84px] text-gray-300 text-center sm:text-lg md:text-2xl mb-8 mt-4 px-4 md:px-0">
          Learn how we handle your information and the terms that guide your use
          of our services. Transparency, trust, and protection are at the heart
          of our policies.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col md:flex-row-reverse items-center justify-center gap-4">
          <Link href="/">
            <button className="px-[40px] py-5 shrink-0 bg-gradient-to-r from-[#6366F1] to-[#A855F7] flex rounded-2xl gap-3 items-center text-lg font-bold text-white w-[260px] justify-center">
              <span>Back To Home</span>
              <span>
                <ArrowIcon className="h-5 w-5" />
              </span>
            </button>
          </Link>

         
        </div>
      </div>

      {/* blob 1 */}
      <div className="w-[40vw] h-[40vw] sm:w-[25vw] sm:h-[25vw] lg:w-[20vw] lg:h-[20vw] shrink-0 bg-[rgba(59,130,246,0.20)] blur-[32px] rounded-full absolute left-[10vw] top-[10vw] sm:left-[75px] sm:top-[78px] z-0"></div>

      {/* blob 2 */}
      <div className="w-[35vw] h-[35vw] sm:w-[20vw] sm:h-[20vw] lg:w-[20vw] lg:h-[20vw] shrink-0 bg-[rgba(168,85,247,0.20)] blur-[32px] rounded-full absolute bottom-10 right-10 sm:bottom-20 sm:right-10 z-0"></div>
    </section>
  );
}


function LegalPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-gray-800">
      <h1 className="text-4xl font-bold mb-10 text-center">
        Privacy Policy & Terms of Service
      </h1>

      {/* ---------------- Privacy Policy ---------------- */}
      <section id="privacy-policy" className="mb-16">
        <h2 className="text-3xl font-semibold mb-4">Privacy Policy</h2>

        <p className="mb-4">
          We collect basic information such as your name, email, and learning
          activity (courses, progress, quizzes) to operate the LMS and improve
          your learning experience.
        </p>

        <p className="mb-4">
          This data helps us deliver content, track progress, personalize
          recommendations, and notify you about updates. We also collect basic
          technical data like IP address and device type to keep the platform
          secure.
        </p>

        <p className="mb-4">
          We do not sell your data. We only share information with instructors,
          institutions, or trusted service providers when necessary for LMS
          operation. You may request correction or deletion of your data at any
          time.
        </p>

        <p className="text-sm text-gray-600">Last Updated: January 2025</p>
      </section>

      {/* Divider */}
      <hr className="my-10" />

      {/* ---------------- Terms of Service ---------------- */}
      <section id="terms-service">
        <h2 className="text-3xl font-semibold mb-4">Terms of Service</h2>

        <p className="mb-4">
          By using our LMS, you agree to create an accurate account and keep
          your login details secure. You must not misuse course materials,
          disrupt the platform, or engage in harmful behavior.
        </p>

        <p className="mb-4">
          All course content is owned by instructors or the platform and cannot
          be copied, resold, or distributed. Paid courses and subscriptions are
          billed upfront, and refunds follow our refund policy.
        </p>

        <p className="mb-4">
          We may suspend accounts that violate the rules. The LMS is provided
          “as is,” and we are not responsible for service interruptions or data
          loss.
        </p>

        <p className="text-sm text-gray-600">Last Updated: January 2025</p>
      </section>
    </div>
  );
}

