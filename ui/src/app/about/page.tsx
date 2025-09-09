import { NavBar } from '@layout/navbar/NavBar';

import { aboutPageJsonLd } from '@lib/jsonld';

import { JsonLd } from '@/components/custom/JsonLd';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({}: BlogPostPageProps) {
  return (
    <>
      <JsonLd data={aboutPageJsonLd()} />
      <NavBar />
      <div className="min-h-screen pb-28 pt-20">
        <div className="container mx-auto px-4"></div>
      </div>
    </>
  );
}
