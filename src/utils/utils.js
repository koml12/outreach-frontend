import dayjs from "dayjs";

const userIsLoggedIn = expectedType => {
  return (
    sessionStorage.getItem("token") !== null &&
    sessionStorage.getItem("type") !== null &&
    sessionStorage.getItem("type") === expectedType
  );
};

const getUserType = () => sessionStorage.getItem("type");

const getToken = () => sessionStorage.getItem("token");

const getUserId = () => sessionStorage.getItem("userId");

const logout = () => {
  sessionStorage.clear();
  window.location.pathname = getLoginPath();
};

const getLoginPath = () => {
  if (window.location.pathname.endsWith("login")) {
    return window.location.pathname;
  }
  if (window.location.pathname.startsWith("/events")) {
    if (window.location.pathname.endsWith("/")) {
      return window.location.pathname + "login";
    }
    return window.location.pathname + "/login";
  }
  return "/login";
};

const generateDateString = rawDateString => {
  if (rawDateString === null) {
    return "";
  }
  return dayjs(rawDateString).format("dddd, MMMM D, YYYY, h:mmA");
};

export { userIsLoggedIn, getUserType, getToken, getUserId, logout, generateDateString };
