import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Privacy Policy | Yard & Home Calc",
  description:
    "Read how Yard & Home Calc handles browser-based calculator inputs, analytics, advertising services, cookies, and information sent by email.",
  path: "/privacy/"
});

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-evergreen">Privacy Policy</h1>
      <div className="mt-6 space-y-5 leading-7 text-slate-700">
        <p>
          Yard & Home Calc is designed as a simple calculator website. Calculator inputs are
          processed in your browser and are not submitted to a backend service by this site.
        </p>
        <p>
          We may use analytics, affiliate tools, and third-party advertising services,
          including Google AdSense, to understand site usage and support the website. These
          providers may process IP addresses, browser or device information, page views,
          referral data, cookies, web beacons, or similar identifiers.
        </p>
        <p>Third-party vendors, including Google, may use advertising cookies to serve and measure ads based on your prior visits to this website or other websites. You can control or opt out of personalized Google advertising in <a className="underline" href="https://adssettings.google.com/">Google Ads Settings</a>. Additional industry opt-out choices are available at <a className="underline" href="https://www.aboutads.info/choices/">aboutads.info</a>.</p>
        <p>
          If you contact us by email, we may use the information you provide to respond to
          your message and improve the calculators.
        </p>
        <p>Last updated: July 11, 2026.</p>
      </div>
    </main>
  );
}
