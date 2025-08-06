'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaginatedBlogPosts } from '@/lib/blog-types';

interface BlogPaginationProps {
  paginatedData: PaginatedBlogPosts;
}

export function BlogPagination({ paginatedData }: BlogPaginationProps) {
  const searchParams = useSearchParams();
  const { pagination } = paginatedData;

  if (pagination.totalPages <= 1) {
    return null;
  }

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    return `/blog?${params.toString()}`;
  };

  const getVisiblePages = () => {
    const current = pagination.currentPage;
    const total = pagination.totalPages;
    const visible = [];

    // Always show first page
    visible.push(1);

    // Add ellipsis if needed
    if (current > 3) {
      visible.push('...');
    }

    // Show pages around current page
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
      visible.push(i);
    }

    // Add ellipsis if needed
    if (current < total - 2) {
      visible.push('...');
    }

    // Always show last page (if not already included)
    if (total > 1) {
      visible.push(total);
    }

    // Remove duplicates while preserving order
    return visible.filter((page, index, arr) => arr.indexOf(page) === index);
  };

  const visiblePages = getVisiblePages();

  return (
    <nav className="flex items-center justify-between border-t border-border px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        {/* Mobile pagination */}
        {pagination.hasPrevPage ? (
          <Link
            href={createPageUrl(pagination.currentPage - 1)}
            className="relative inline-flex items-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
          >
            Previous
          </Link>
        ) : (
          <span className="relative inline-flex items-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-muted-foreground cursor-not-allowed">
            Previous
          </span>
        )}
        
        {pagination.hasNextPage ? (
          <Link
            href={createPageUrl(pagination.currentPage + 1)}
            className="relative ml-3 inline-flex items-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
          >
            Next
          </Link>
        ) : (
          <span className="relative ml-3 inline-flex items-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-muted-foreground cursor-not-allowed">
            Next
          </span>
        )}
      </div>

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            Showing{' '}
            <span className="font-medium">
              {(pagination.currentPage - 1) * pagination.postsPerPage + 1}
            </span>{' '}
            to{' '}
            <span className="font-medium">
              {Math.min(pagination.currentPage * pagination.postsPerPage, pagination.totalPosts)}
            </span>{' '}
            of <span className="font-medium">{pagination.totalPosts}</span> results
          </p>
        </div>
        
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            {/* Previous button */}
            {pagination.hasPrevPage ? (
              <Link
                href={createPageUrl(pagination.currentPage - 1)}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-foreground ring-1 ring-inset ring-border hover:bg-muted focus:z-20 focus:outline-offset-0"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Previous</span>
              </Link>
            ) : (
              <span className="relative inline-flex items-center rounded-l-md px-2 py-2 text-muted-foreground ring-1 ring-inset ring-border cursor-not-allowed">
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Previous</span>
              </span>
            )}

            {/* Page numbers */}
            {visiblePages.map((page, index) => {
              if (page === '...') {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-muted-foreground ring-1 ring-inset ring-border"
                  >
                    ...
                  </span>
                );
              }

              const pageNumber = page as number;
              const isCurrent = pageNumber === pagination.currentPage;

              return (
                <Link
                  key={pageNumber}
                  href={createPageUrl(pageNumber)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-border focus:z-20 focus:outline-offset-0 ${
                    isCurrent
                      ? 'z-10 bg-primary text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  {pageNumber}
                </Link>
              );
            })}

            {/* Next button */}
            {pagination.hasNextPage ? (
              <Link
                href={createPageUrl(pagination.currentPage + 1)}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-foreground ring-1 ring-inset ring-border hover:bg-muted focus:z-20 focus:outline-offset-0"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Next</span>
              </Link>
            ) : (
              <span className="relative inline-flex items-center rounded-r-md px-2 py-2 text-muted-foreground ring-1 ring-inset ring-border cursor-not-allowed">
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Next</span>
              </span>
            )}
          </nav>
        </div>
      </div>
    </nav>
  );
}
