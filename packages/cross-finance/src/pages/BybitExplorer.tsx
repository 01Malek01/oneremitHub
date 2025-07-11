import React, { lazy, Suspense } from 'react';

const BybitExplorerApp = lazy(() => import('bybit-explorer/App'));

export default function BybitExplorer() {
  return (
    <Suspense fallback={<div>Loading Bybit Explorer...</div>}>
      <BybitExplorerApp />
    </Suspense>
  );
}
