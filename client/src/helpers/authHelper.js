const loginUser = (token) => {
  console.log(token);
  localStorage.setItem("token", token);
  // window.localStorage.setItem("token", token);
};

export { loginUser };
