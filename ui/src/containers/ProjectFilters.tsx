'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { TechBadge } from '../components/TechBadge';

export interface ProjectFiltersProps {
  allTech: string[];
  currentTechCsv?: string;
  currentSearch?: string;
}

export function ProjectFilters({ allTech, currentTechCsv, currentSearch }: ProjectFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState(currentSearch || '');
  const [selectedTech, setSelectedTech] = useState<string[]>(() =>
    currentTechCsv ? currentTechCsv.split(',').filter(Boolean) : [],
  );

  // Update URL when search debounced
  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (searchInput.trim()) params.set('search', searchInput.trim());
      else params.delete('search');
      if (selectedTech.length) params.set('tech', selectedTech.join(','));
      else params.delete('tech');
      params.delete('page');
      router.push(`/projects?${params.toString()}`);
    }, 200);
    return () => clearTimeout(timeout);
  }, [searchInput, selectedTech, router, searchParams]);

  const toggleTech = (tech: string) => {
    setSelectedTech((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech],
    );
  };

  const clearAll = () => {
    setSearchInput('');
    setSelectedTech([]);
    router.push('/projects');
  };

  const hasFilters = selectedTech.length > 0 || searchInput.trim();

  return (
    <div className="mb-8 space-y-6">
      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search projects..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full rounded-md border border-input bg-background py-2 pl-10 pr-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-foreground">Filter by tech:</h3>
        <div className="flex flex-wrap gap-2">
          {allTech.map((t) => {
            return (
              <button key={t} type="button" onClick={() => toggleTech(t)}>
                <TechBadge tech={t} withLabel />
              </button>
            );
          })}
        </div>
      </div>
      {hasFilters && (
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="text-muted-foreground">Active filters:</span>
          {searchInput && (
            <span className="rounded-md border px-2 py-1 text-xs">Search: “{searchInput}”</span>
          )}
          {selectedTech.map((t) => (
            <span key={t} className="flex items-center gap-1 rounded-md border px-2 py-1 text-xs">
              {t}
              <button
                aria-label={`Remove ${t}`}
                onClick={() => toggleTech(t)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          <button onClick={clearAll} className="font-medium text-primary hover:underline">
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
