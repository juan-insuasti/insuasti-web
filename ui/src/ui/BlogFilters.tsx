'use client';

import { useState } from 'react';
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    
    if (searchInput.trim()) {
      params.set('search', searchInput.trim());
    } else {
      params.delete('search');
    }
    
    // Reset to first page when searching
    params.delete('page');
    
    router.push(`/blog?${params.toString()}`);
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
    <div className="space-y-6 mb-8">
      {/* Search */}
      <form onSubmit={handleSearch} className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <input
          type="text"
          placeholder="Search posts..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
        />
      </form>

      {/* Tags */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-foreground">Filter by tags:</h3>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagFilter(tag)}
              className="transition-all"
            >
              <Badge 
                variant={currentTag === tag ? "default" : "secondary"}
                className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
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
          {currentSearch && (
            <Badge variant="outline">
              Search: &ldquo;{currentSearch}&rdquo;
            </Badge>
          )}
          {currentTag && (
            <Badge variant="outline">
              Tag: {currentTag}
            </Badge>
          )}
          <button
            onClick={clearFilters}
            className="text-primary hover:underline font-medium"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
