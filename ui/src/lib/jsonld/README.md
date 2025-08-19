# JSON-LD Structured Data

This directory contains JSON-LD structured data schemas for different pages of the site. These schemas help search engines understand the content and improve SEO.

## Available Schemas

### Homepage (`homepage.ts`)

- **Schema Types**: `Person`, `WebSite`
- **Usage**: `import { homepageJsonLd } from '@/lib/jsonld'`
- **Description**: Describes Juan Insuasti as a person and the website

### Blog Page (`blog-page.ts`)

- **Schema Types**: `Blog`, `WebPage`
- **Usage**: `import { blogPageJsonLd } from '@/lib/jsonld'`
- **Description**: Describes the blog listing page and blog itself

### Blog Post (`blog-post.ts`)

- **Schema Types**: `BlogPosting`, `WebPage`, `Article`
- **Usage**: `import { blogPostJsonLd } from '@/lib/jsonld'`
- **Description**: Describes individual blog posts with metadata
- **Parameters**: Requires a `BlogPost` object

### Projects Page (`projects-page.ts`)

- **Schema Types**: `CollectionPage`, `WebPage`
- **Usage**: `import { projectsPageJsonLd } from '@/lib/jsonld'`
- **Description**: Describes the projects page and featured projects
- **Parameters**: Optional array of `ProjectMeta` objects

## Usage Example

```tsx
import { JsonLd } from '@/components/JsonLd';
import { homepageJsonLd } from '@/lib/jsonld';

export default function HomePage() {
  return (
    <>
      <JsonLd data={homepageJsonLd()} />
      {/* Rest of your page content */}
    </>
  );
}
```

## JsonLd Component

The `JsonLd` component located in `@/components/JsonLd` handles the rendering of JSON-LD data. It accepts either a single schema object or an array of schema objects.

```tsx
<JsonLd data={schemaData} />
```

## Schema.org Types Used

- **Person**: For author/developer information
- **WebSite**: For website-level information
- **Blog**: For the blog as a whole
- **BlogPosting**: For individual blog posts
- **Article**: Alternative representation for blog posts
- **WebPage**: For individual pages
- **CollectionPage**: For pages that list collections (projects)
- **CreativeWork**: For projects and portfolio items
- **BreadcrumbList**: For navigation breadcrumbs

## Best Practices

1. Always include breadcrumbs for navigation hierarchy
2. Use consistent URL formatting (https://insuasti.com)
3. Include relevant keywords and descriptions
4. Ensure dates are in ISO format
5. Link related entities using the same identifiers

## Validation

You can validate the JSON-LD output using:

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema Markup Validator](https://validator.schema.org/)
- [JSON-LD Playground](https://json-ld.org/playground/)
