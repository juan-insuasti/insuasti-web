interface JsonLdProps {
  data: object | object[];
}

/**
 * Component for rendering JSON-LD structured data
 * Accepts either a single schema object or an array of schema objects
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <>
      <script
        id={`jsonld`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(data).replace(/</g, '\\u003c'),
        }}
      />
    </>
  );
}
