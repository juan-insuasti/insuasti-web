---
title: 'GitHub-Style Callouts Demo'
date: '2025-01-25'
author: 'Juan Insuasti'
excerpt: 'A demonstration of GitHub-style callouts in markdown using remark-blockquote-alerts plugin.'
tags: ['markdown', 'callouts', 'demo', 'github']
publish: '2025-01-25'
---

This post demonstrates the different types of callouts available in our markdown processing pipeline using the `remark-blockquote-alerts` plugin.

## Available Callout Types

### Note Callouts

Use note callouts for general information and helpful tips.

> [!NOTE]
> This is a note callout. Use it to provide additional context or helpful information that readers should be aware of.

### Important Callouts

Important callouts highlight critical information.

> [!IMPORTANT]
> This is an important callout. Use it for crucial information that users must pay attention to.

### Warning Callouts

Warning callouts alert users to potential issues.

> [!WARNING]
> This is a warning callout. Use it to alert users about potential problems or things they should be careful about.

### Tip Callouts

Tip callouts provide helpful suggestions and best practices.

> [!TIP]
> This is a tip callout. Use it to share helpful suggestions, best practices, or useful tricks.

### Caution Callouts

Caution callouts warn about dangerous actions.

> [!CAUTION]
> This is a caution callout. Use it to warn users about dangerous actions or critical issues that could cause problems.

## How to Use

Simply use the standard blockquote syntax with the special alert syntax:

```markdown
> [!NOTE]
> Your note content goes here.

> [!WARNING]
> Your warning content goes here.
```

## Multi-paragraph Callouts

You can also use multiple paragraphs within callouts:

> [!TIP]
> This is the first paragraph of a tip callout.
>
> This is a second paragraph in the same tip callout. All paragraphs will be styled consistently within the callout container.

## Callouts with Code

> [!IMPORTANT]
> When working with React components, always remember to:
>
> ```jsx
> // Use proper prop types
> function MyComponent({ title, onClick }) {
>   return <button onClick={onClick}>{title}</button>;
> }
> ```

That's how you can enhance your markdown content with beautiful, GitHub-style callouts!
