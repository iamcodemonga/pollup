// app/components/GoogleAnalytics.tsx
"use client";

import { GoogleAnalytics } from "nextjs-google-analytics";

export default function SiteAnalytics() {
  return <GoogleAnalytics trackPageViews gaMeasurementId="G-92E1S4ZSMM" />;
}