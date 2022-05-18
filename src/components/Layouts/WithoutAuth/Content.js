import React from "react";

const Content = ({ children }) => {
  return (
    <main role="main" className="mt-2">
      {children}
    </main>
  );
};

export default Content;
