const loginUser = (token) => {
  console.log(token);
  localStorage.setItem("__token", token);
  // window.localStorage.setItem("token", token);
};

export { loginUser };
