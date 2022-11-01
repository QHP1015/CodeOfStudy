import React, { Suspense } from "react";

const OtherComponent = React.lazy(() => import("./otherComponent"));

export const LazyUse = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
        </section>
      </Suspense>
    </div>
  );
};
