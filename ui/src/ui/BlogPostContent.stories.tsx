import type { Meta, StoryObj } from '@storybook/react';
import { BlogPostContent } from './BlogPostContent';
import { BlogPost } from '@/lib/blog-types';

const meta: Meta<typeof BlogPostContent> = {
  title: 'UI/BlogPostContent',
  component: BlogPostContent,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    post: {
      description: 'Complete blog post object',
    },
    htmlContent: {
      description: 'HTML content of the blog post',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const samplePost: BlogPost = {
  slug: 'hello-world',
  title: 'Hello World: Starting My Blog Journey',
  date: '2025-01-15',
  author: 'Juan Insuasti',
  excerpt: 'Welcome to my blog! This is the first post where I share my thoughts on frontend development and web technologies.',
  tags: ['introduction', 'frontend', 'blog'],
  content: `# Welcome to My Blog

This is my first blog post! I'm excited to share my journey as a frontend developer and the things I learn along the way.

## What You Can Expect

In this blog, I'll be covering:

- **Frontend Development** techniques and best practices
- **React** and Next.js tutorials
- **TypeScript** tips and tricks
- **Web Performance** optimization strategies

\`\`\`javascript
// Here's a simple hello world in JavaScript
function helloWorld() {
  console.log("Hello, World!");
}

helloWorld();
\`\`\`

## Getting Started with Modern Web Development

Modern web development has evolved significantly over the past few years. With frameworks like Next.js, we can build fast, SEO-friendly applications with ease.

Some key concepts to master:

1. **Server-Side Rendering (SSR)**
2. **Static Site Generation (SSG)**
3. **Client-Side Rendering (CSR)**
4. **Incremental Static Regeneration (ISR)**

> "The best way to learn is by doing" - Unknown

I look forward to sharing more insights and tutorials with you. Stay tuned for more content!`,  
};

const samplePostHTMLContent = `<h1>Welcome to My Blog</h1>

<p>This is my first blog post! I'm excited to share my journey as a frontend developer and the things I learn along the way.</p>

<h2>What You Can Expect</h2>

<p>In this blog, I'll be covering:</p>

<ul>
<li><strong>Frontend Development</strong> techniques and best practices</li>
<li><strong>React</strong> and Next.js tutorials</li>
<li><strong>TypeScript</strong> tips and tricks</li>
<li><strong>Web Performance</strong> optimization strategies</li>
</ul>

<pre><code class="language-javascript">// Here's a simple hello world in JavaScript
function helloWorld() {
  console.log("Hello, World!");
}

helloWorld();
</code></pre>

<h2>Getting Started with Modern Web Development</h2>

<p>Modern web development has evolved significantly over the past few years. With frameworks like Next.js, we can build fast, SEO-friendly applications with ease.</p>

<p>Some key concepts to master:</p>

<ol>
<li><strong>Server-Side Rendering (SSR)</ li>
<li><strong>Static Site Generation (SSG)</li>
<li><strong>Client-Side Rendering (CSR)</li>
<li><strong>Incremental Static Regeneration (ISR)</li>
</ol>

<blockquote>
<p>"The best way to learn is by doing" - Unknown</p>
</blockquote>

<p>I look forward to sharing more insights and tutorials with you. Stay tuned for more content!</p>
`;

const technicalPost: BlogPost = {
  slug: 'react-performance',
  title: 'Building Performant React Applications',
  date: '2025-01-10',
  author: 'Juan Insuasti',
  excerpt: 'Learn essential techniques for optimizing React applications, from code splitting to memory management.',
  tags: ['react', 'performance', 'optimization', 'frontend'],
  content: `# Building Performant React Applications

Performance is crucial for user experience. In this post, we'll explore various techniques to optimize React applications.

## Code Splitting with React.lazy()

Code splitting helps reduce the initial bundle size by loading components only when needed.

\`\`\`tsx
import { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
\`\`\`

## Memoization Strategies

### React.memo

Use \`React.memo\` to prevent unnecessary re-renders of functional components:

\`\`\`tsx
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* Complex rendering logic */}</div>;
});
\`\`\`

### useMemo and useCallback

\`\`\`tsx
function Component({ items, onItemClick }) {
  const expensiveValue = useMemo(() => {
    return items.reduce((acc, item) => acc + item.value, 0);
  }, [items]);

  const handleClick = useCallback((id) => {
    onItemClick(id);
  }, [onItemClick]);

  return (
    <div>
      <p>Total: {expensiveValue}</p>
      {items.map(item => (
        <button key={item.id} onClick={() => handleClick(item.id)}>
          {item.name}
        </button>
      ))}
    </div>
  );
}
\`\`\`

## Performance Monitoring

Use tools like:
- React DevTools Profiler
- Chrome DevTools  
- Web Vitals
- Lighthouse

## Conclusion

Performance optimization is an ongoing process. Start with measuring, then optimize the bottlenecks that matter most to your users.`,
};

const technicalPostHTMLContent = `<h1>Building Performant React Applications</h1>

<p>Performance is crucial for user experience. In this post, we'll explore various techniques to optimize React applications.</p>

<h2>Code Splitting with React.lazy()</h2>

<p>Code splitting helps reduce the initial bundle size by loading components only when needed.</p>

<pre><code class="language-tsx">import { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    &lt;Suspense fallback=&quot;&lt;div&gt;Loading...&lt;/div&gt;&quot;&gt;
      &lt;LazyComponent /&gt;
    &lt;/Suspense&gt;
  );
}
</code></pre>

<h2>Memoization Strategies</h2>

<h3>React.memo</h3>

<p>Use <code>React.memo</code> to prevent unnecessary re-renders of functional components:</p>

<pre><code class="language-ts x">const ExpensiveComponent = React.memo(({ data }) => {
  return &lt;div&gt;{/* Complex rendering logic */}&lt;/div&gt;;
});
</code></pre>

<h3>useMemo and useCallback</h3>

<pre><code class="language-tsx">function Component({ items, onItemClick }) {
  const expensiveValue = useMemo(() => {
    return items.reduce((acc, item) => acc + item.value, 0);
  }, [items]);

  const handleClick = useCallback((id) => {
    onItemClick(id);
  }, [onItemClick]);

  return (
    &lt;div&gt;
      &lt;p&gt;Total: {expensiveValue}&lt;/p&gt;
      {items.map(item => (
        &lt;button key={item.id} onClick={() => handleClick(item.id)}&gt;
          {item.name}
        &lt;/button&gt;
      ))}
    &lt;/div&gt;
  );
}
</code></pre>

<h2>Performance Monitoring</h2>

<p>Use tools like:</p>
<ul>
<li>React Dev Tools Profiler</li>
<li>Chrome DevTools</li>
<li>Web Vitals</li>
<li>Lighthouse</li>
</ul>

<h2>Conclusion</h2>

<p>Performance optimization is an ongoing process. Start with measuring, then optimize the bottlenecks that matter most to your users.</p>
`;

// Sample short post for testing

const shortPost: BlogPost = {
  slug: 'short-post',
  title: 'A Short Post',
  date: '2025-01-01',
  author: 'Author',
  excerpt: 'Brief post example.',
  tags: ['example'],
  content: `# A Short Post

This is a brief example of what a short blog post might look like.

It has minimal content but still follows the same structure.`,
};

const shortPostHTMLContent = `<h1>A Short Post</h1>

<p>This is a brief example of what a short blog post might look like.</p>

<p>It has minimal content but still follows the same structure.</p>
`;

export const Default: Story = {
  args: {
    post: samplePost,
    htmlContent: samplePostHTMLContent,
  },
};

export const TechnicalPost: Story = {
  args: {
      post: technicalPost,
      htmlContent: technicalPostHTMLContent,
    },
  };

export const ShortPost: Story = {
  args: {
    post: shortPost,
    htmlContent: shortPostHTMLContent,
  },
};

export const ManyTags: Story = {
  args: {
    post: {
      ...samplePost,
      tags: ['react', 'nextjs', 'typescript', 'tailwind', 'storybook', 'testing', 'performance', 'optimization'],
    },
  },
};

export const NoTags: Story = {
  args: {
    post: {
      ...samplePost,
      tags: [],
    },
  },
};
