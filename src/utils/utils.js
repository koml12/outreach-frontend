import dayjs from "dayjs";

const userIsLoggedIn = () => {
  return sessionStorage.getItem("token") !== null && sessionStorage.getItem("type") !== null;
};

const generateDateString = rawDateString => {
  if (rawDateString === null) {
    return "";
  }
  return dayjs(rawDateString).format("dddd, MMMM D, YYYY, h:mmA");
};

export { userIsLoggedIn, generateDateString };
