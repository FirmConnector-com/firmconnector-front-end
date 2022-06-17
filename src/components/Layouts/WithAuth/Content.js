import React from "react";

const Content = ({ children }) => {
  return (
    <main role="main" className="container my-5">
      {children}
    </main>
  );
};

export default Content;
