import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../index';

const Pages = observer(() => {
  const { device } = useStore();
  const pageCount = Math.ceil(device.totalCount / device.limit);
  const pages: number[] = [];
  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }

  // Build visible page items with ellipsis (like screenshot: 1 2 3 .... 7)
  const getVisiblePages = (): (number | 'ellipsis')[] => {
    if (pageCount <= 7) return pages;

    const current = device.page;
    const result: (number | 'ellipsis')[] = [];

    // Always show first 3 near current page, last page
    const nearStart = [1, 2, 3];
    const showEllipsis = current <= 4 || current >= pageCount - 2;

    // Simple display: show 1..3, ellipsis, last page — like screenshot
    result.push(1, 2, 3);
    result.push('ellipsis');
    result.push(pageCount);

    return result;
  };

  const visiblePages = getVisiblePages();

  const btnBase: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 34,
    height: 34,
    borderRadius: 6,
    border: '1px solid #ddd',
    background: '#fff',
    fontSize: 14,
    fontWeight: 500,
    color: '#333',
    cursor: 'pointer',
    transition: 'all 0.15s',
    userSelect: 'none',
    outline: 'none',
  };

  const activeStyle: React.CSSProperties = {
    ...btnBase,
    background: '#1a1a1a',
    color: '#fff',
    border: '1px solid #1a1a1a',
  };

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 24 }}
    >
      {visiblePages.map((p, i) =>
        p === 'ellipsis' ? (
          <span
            key={`ellipsis-${i}`}
            style={{
              fontSize: 14,
              color: '#999',
              letterSpacing: 1,
              padding: '0 4px',
            }}
          >
            ....
          </span>
        ) : (
          <button
            key={p}
            onClick={() => device.setPage(p)}
            style={device.page === p ? activeStyle : btnBase}
            onMouseEnter={(e) => {
              if (device.page !== p) {
                (e.currentTarget as HTMLButtonElement).style.background =
                  '#f5f5f5';
              }
            }}
            onMouseLeave={(e) => {
              if (device.page !== p) {
                (e.currentTarget as HTMLButtonElement).style.background =
                  '#fff';
              }
            }}
          >
            {p}
          </button>
        ),
      )}
    </div>
  );
});

export default Pages;
