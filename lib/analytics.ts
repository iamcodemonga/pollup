/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/analytics.ts
export const sendGAEvent = (
    action: string,
    params: Record<string, any> = {}
  ) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", action, params);
    }
  };
  