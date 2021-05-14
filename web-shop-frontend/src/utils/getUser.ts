import axios from "axios";

export const getUser = async () => {
  axios.defaults.withCredentials = true;
  const cookie = await axios.get("http://localhost:4000/api/v1/user/me");

  //console.log("IZ FUNKCIJE ", cookie.data.user);
  return cookie.data.user;
};
