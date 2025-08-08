---
title: "Working with Images in Markdown"
date: "2025-01-20"
author: "Juan Insuasti"
excerpt: "A demonstration of how images work in markdown blog posts with various examples and styles."
tags: ["markdown", "images", "blog", "examples"]
---

# Working with Images in Markdown

This post demonstrates how images work in our markdown blog system. You can include images in several ways:

## Basic Image

Here's a basic image reference:

![Sample Image](/Insua2.jpg)

## Image with Title (Caption)

When you provide a title attribute, it becomes a caption:

![Sample Image with Caption](/Insua2.jpg "This is a caption that appears below the image")

## Relative vs Absolute Paths

You can use images from the public folder:

![Public folder image](/file.svg)

Or reference them with relative paths (they get converted to absolute):

![Relative path image](globe.svg)

## Different Image Sizes

The system automatically handles different image sizes and maintains aspect ratios:

![Logo](/next.svg)

![Larger Image](/Insua2.jpg)

## Social Icons

![GitHub](/social-github.svg)
![LinkedIn](/social-linkedin.svg)

## Responsive Images

All images are automatically responsive and will scale appropriately on different screen sizes. They also include:

- Automatic width and height attributes for better performance
- Loading optimization
- Proper alt text for accessibility
- Shadow and border radius styling
- Error handling for missing images

## Best Practices

1. **Always include alt text** - This is crucial for accessibility
2. **Use descriptive filenames** - This helps with SEO and organization
3. **Optimize image sizes** - Large images will still work but smaller files load faster
4. **Use appropriate formats** - JPG for photos, PNG for graphics, SVG for icons

That's how you can work with images in your markdown blog posts!
