'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface BlogFiltersProps {
  allTags: string[];
  currentTag?: string;
  currentSearch?: string;
}

export function BlogFilters({ allTags, currentTag, currentSearch }: BlogFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState(currentSearch || '');

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      if (searchInput.trim()) {
        params.set('search', searchInput.trim());
      } else {
        params.delete('search');
      }

      // Reset to first page when searching
      params.delete('page');

      // Only navigate if the search has actually changed
      const newSearch = searchInput.trim();
      if (newSearch !== currentSearch) {
        router.push(`/blog?${params.toString()}`);
      }
    }, 200); // 200ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchInput, router, searchParams, currentSearch]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleTagFilter = (tag: string) => {
    const params = new URLSearchParams(searchParams);

    if (currentTag === tag) {
      // Remove tag filter if clicking the same tag
      params.delete('tag');
    } else {
      params.set('tag', tag);
    }

    // Reset to first page when filtering
    params.delete('page');

    router.push(`/blog?${params.toString()}`);
  };

  const clearFilters = () => {
    setSearchInput('');
    router.push('/blog');
  };

  const hasActiveFilters = currentTag || currentSearch;

  return (
    <div className="mb-8 space-y-6">
      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
        <input
          type="text"
          placeholder="Search posts..."
          value={searchInput}
          onChange={handleSearchInputChange}
          className="w-full rounded-md border border-input bg-background py-2 pl-10 pr-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Tags */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-foreground">Filter by tags:</h3>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button key={tag} onClick={() => handleTagFilter(tag)} className="transition-all">
              <Badge
                variant={currentTag === tag ? 'default' : 'secondary'}
                className="cursor-pointer transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                {tag}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      {/* Active filters and clear button */}
      {hasActiveFilters && (
        <div className="flex items-center gap-3 text-sm">
          <span className="text-muted-foreground">Active filters:</span>
          {currentSearch && <Badge variant="outline">Search: &ldquo;{currentSearch}&rdquo;</Badge>}
          {currentTag && <Badge variant="outline">Tag: {currentTag}</Badge>}
          <button onClick={clearFilters} className="font-medium text-primary hover:underline">
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
