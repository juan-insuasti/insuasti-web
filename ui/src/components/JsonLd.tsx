import Script from 'next/script';

interface JsonLdProps {
  data: object | object[];
}

/**
 * Component for rendering JSON-LD structured data
 * Accepts either a single schema object or an array of schema objects
 */
export function JsonLd({ data }: JsonLdProps) {
  const jsonData = Array.isArray(data) ? data : [data];
  return (
    <>
      <Script
        id={`jsonld`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonData),
        }}
      />
    </>
  );
}
