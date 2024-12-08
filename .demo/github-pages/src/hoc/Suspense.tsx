import React from 'react';

const Suspense = ({ children }: any) => {
  return <React.Suspense fallback={'loading...'}>{children}</React.Suspense>;
};

export default Suspense;
