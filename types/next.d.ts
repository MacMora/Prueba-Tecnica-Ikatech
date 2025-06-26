/// <reference types="next" />
/// <reference types="next/image-types/global" />

declare module '*.json' {
  const value: Record<string, unknown>;
  export default value;
}

// Extend Next.js types for better compatibility
declare module 'next' {
  interface PageProps {
    params: Promise<Record<string, string>>;
    searchParams?: Promise<Record<string, string | string[]>>;
  }
} 