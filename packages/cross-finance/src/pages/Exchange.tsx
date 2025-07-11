import { lazy, Suspense } from "react";

const FXCompass = lazy(() => import('fx_compass/App'));

const Exchange = () => {
  return (
    <Suspense fallback={<div>Loading FX Compass...</div>}>
      <FXCompass />
    </Suspense>
  );
};

export default Exchange;
