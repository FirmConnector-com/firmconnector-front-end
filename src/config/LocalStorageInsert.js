const insertLoginResponseData = (data) => {
  localStorage.setItem("loggedinUserDetails", JSON.stringify(data));
  localStorage.setItem("isAuthenticated", "true");
};

export { insertLoginResponseData };
