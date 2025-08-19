/**
 * Simple validation test for JSON-LD schemas
 * Run this file to check if all schemas generate valid JSON
 */

import { homepageJsonLd, blogPageJsonLd, blogPostJsonLd, projectsPageJsonLd } from './index';
import type { BlogPost } from '../blog-types';
import type { ProjectMeta } from '../project-types';

// Mock data for testing
const mockBlogPost: BlogPost = {
  slug: 'test-post',
  title: 'Test Blog Post',
  date: '2025-01-01',
  author: 'Juan Insuasti',
  excerpt: 'This is a test blog post excerpt',
  tags: ['test', 'example'],
  content: 'This is the content of the test blog post',
  publish: '2025-01-01',
  highlighted: false,
};

const mockProjects: ProjectMeta[] = [
  {
    slug: 'test-project',
    title: 'Test Project',
    summary: 'This is a test project summary',
    tech: ['React', 'TypeScript'],
    coverImage: '/projects/test-cover.png',
    screenshots: ['/projects/test-screenshot.png'],
    repoUrl: 'https://github.com/test/test-project',
    demoUrl: 'https://test-project.demo.com',
    date: '2025-01-01',
    status: 'stable',
    highlighted: true,
  },
];

/**
 * Test function to validate JSON-LD schemas
 */
function testJsonLdSchemas() {
  console.log('Testing JSON-LD schemas...\n');

  try {
    // Test homepage schema
    const homepage = homepageJsonLd();
    console.log(
      '✅ Homepage JSON-LD:',
      JSON.stringify(homepage, null, 2).substring(0, 100) + '...',
    );

    // Test blog page schema
    const blogPage = blogPageJsonLd();
    console.log(
      '✅ Blog page JSON-LD:',
      JSON.stringify(blogPage, null, 2).substring(0, 100) + '...',
    );

    // Test blog post schema
    const blogPost = blogPostJsonLd(mockBlogPost);
    console.log(
      '✅ Blog post JSON-LD:',
      JSON.stringify(blogPost, null, 2).substring(0, 100) + '...',
    );

    // Test projects page schema
    const projectsPage = projectsPageJsonLd(mockProjects);
    console.log(
      '✅ Projects page JSON-LD:',
      JSON.stringify(projectsPage, null, 2).substring(0, 100) + '...',
    );

    console.log('\n🎉 All JSON-LD schemas are valid!');
  } catch (error) {
    console.error('❌ Error in JSON-LD schemas:', error);
  }
}

// Only run if this file is executed directly
if (require.main === module) {
  testJsonLdSchemas();
}

export { testJsonLdSchemas };
