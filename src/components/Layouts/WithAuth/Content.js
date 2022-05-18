import React from "react";

const Content = ({ children }) => {
  return (
    <main role="main" className="container">
      {children}
    </main>
  );
};

export default Content;
