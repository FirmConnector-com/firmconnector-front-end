import React from "react";

const Content = ({ children }) => {
  return (
    <main role="main" class="bd-main">
      {children}
    </main>
  );
};

export default Content;
