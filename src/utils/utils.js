import dayjs from "dayjs";

const userIsLoggedIn = () => {
  return localStorage.getItem("token") !== null && localStorage.getItem("type") !== null;
};

const generateDateString = rawDateString => {
  return dayjs(rawDateString).format("dddd, MMMM D, YYYY, h:mmA");
};

export { userIsLoggedIn, generateDateString };
