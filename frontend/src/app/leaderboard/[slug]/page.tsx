export const runtime = 'edge';

import type { Metadata } from 'next';
import { Suspense } from 'react';
import LeaderboardDetailClient from '@/components/leaderboard/LeaderboardDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const title = (slug || '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    title: `${title} — Performance & Leaderboard Specs | AI Orbit`,
    description: `Comprehensive performance benchmarks, pricing, throughput, and specifications for ${title} on AiOrbit Ecosystem Leaderboard.`,
  };
}

export default async function LeaderboardDetailPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white p-8">
          <div className="max-w-[1440px] mx-auto animate-pulse space-y-6">
            <div className="h-6 w-48 bg-[#16161c] rounded-lg" />
            <div className="h-12 w-96 bg-[#16161c] rounded-xl" />
            <div className="grid grid-cols-4 gap-4">
              <div className="h-24 bg-[#16161c] rounded-xl" />
              <div className="h-24 bg-[#16161c] rounded-xl" />
              <div className="h-24 bg-[#16161c] rounded-xl" />
              <div className="h-24 bg-[#16161c] rounded-xl" />
            </div>
            <div className="h-96 bg-[#16161c] rounded-2xl" />
          </div>
        </div>
      }
    >
      <LeaderboardDetailClient slug={slug} />
    </Suspense>
  );
}
