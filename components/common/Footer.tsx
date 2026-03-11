// components/Footer.tsx
import Link from "next/link";
import logo from "@/public/evolve-logo.png";
import Image from "next/image";

const socials = [
  {
    name: "Instagram",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path
          fill="currentColor"
          d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.8A5.2 5.2 0 1 1 6.8 13 5.2 5.2 0 0 1 12 7.8Zm0 2a3.2 3.2 0 1 0 3.2 3.2A3.2 3.2 0 0 0 12 9.8Zm5.75-3.05a1.15 1.15 0 1 1-1.15 1.15 1.15 1.15 0 0 1 1.15-1.15Z"
        />
      </svg>
    ),
  },
  {
    name: "X",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path
          fill="currentColor"
          d="M18.244 2H21l-6.42 7.35L22 22h-6.59l-4.64-6.06L5.44 22H2l6.87-7.86L2 2h6.68l4.19 5.6L18.244 2Zm-2.32 18h1.27L8.18 4H6.84l9.08 16Z"
        />
      </svg>
    ),
  },
];

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Find Tutors", href: "/find-tutors" },
  { label: "Contact", href: "/contact" },
  // { label: "Book Session", href: "#" },
];

const supportLinks = [
  { label: "Help Center", href: "/contact/#send-message" },
  { label: "Privacy Policy", href: "/privacy-policy/" },
  { label: "Terms of Service", href: "/privacy-policy/#terms-service" },
  { label: "FAQ", href: "/contact/#faq" },
];



export default function Footer() {
  return (
    <footer className="bg-[#1E293B] text-[#D1D5DB] pt-[36px] pb-[35px]">
      <div className="mx-auto container px-6 ">
        <div className="grid gap-12 lg:gap-[123px] md:grid-cols-2 lg:grid-cols-4">
          {/* Brand + blurb */}
          <div className="space-y-6">
            <div>
              <div className="flex mb-1.5">
                {/* replace with your logo image if you have one */}
                <Image
                  className=" w-[114.778px] h-[51px]"
                  src={logo}
                  alt=""
                  width={150}
                  height={100}
                />
              </div>
              <p className="w-[302px] text-gray-300  text-base font-normal leading-6 font-arial">
                {/* Empowering students to reach their full potential through
                personalized tutoring and innovative learning solutions. */}
                Be your own hero
              </p>
            </div>
            <div className="flex items-center gap-4 pt-2">
              {socials.map((s) => (
                <Link
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="text-white/70 transition hover:text-white"
                >
                  {s.svg}
                </Link>
              ))}
            </div>
          </div>

          {/* Commitment */}
          <div>
            <h3 className="text-white [font-family:Arial] text-lg font-bold leading-7">
              Our Commitment to you
            </h3>
            <p className="mt-3 text-xs leading-6 text-[#9DB0C3]">
              At Evolve, we believe that learning isn’t just a process – it’s a
              transformation. that’s why we’re committed to creating an
              environment where every student can grow with confidence, clarity,
              and purpose..
              {/* <Link
                href="#"
                className="underline underline-offset-2 hover:text-white"
              >
                here
              </Link> */}
              .
              <br />
              {/* *Purchasing gift cards or digital items does not count toward the
              $100 for Free Shipping or other promotions. */}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white [font-family:Arial] text-lg font-bold leading-7">
              Quick Links
            </h3>
            <ul className="mt-3 space-y-[15px] text-sm">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-[#D1D5DB] hover:text-white transition"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white [font-family:Arial] text-lg font-bold leading-7">
              Support
            </h3>
            <ul className="mt-3 space-y-[15px] text-sm">
              {supportLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-[#D1D5DB] hover:text-white transition"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        {/* <div className="mt-8 h-[2px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" /> */}
        <div className="mt-8 h-[1px] w-full bg-gray-700" />

        {/* Copyright */}
        <p className="mt-8 text-center text-xs text-[#8FA2B5]">
          © 2024 Evolve Tutoring LLC. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
