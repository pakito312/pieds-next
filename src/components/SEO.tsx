'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
}

const SEO = ({
  title = "Pieds dans l'eau Soa - Restaurant Camerounais Traditionnel",
  description = "Restaurant traditionnel camerounais à Soa proposant des plats authentiques, une ambiance chaleureuse et une boutique de produits artisanaux.",
  canonical = "",
  image = "/uploads/6b0f4bd8-4378-46b9-9ba0-6b09bd6832c5.png",
}: SEOProps) => {
  const siteUrl = "https://piedsdansleausoa.com";
  const fullUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;
  const fullTitle = title.includes("Pieds dans l'eau") ? title : `${title} | Pieds dans l'eau Soa`;
  
  return (
    <Head>
      {/* Basic meta tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${image}`} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${siteUrl}${image}`} />
    </Head>
  );
};

export default SEO;