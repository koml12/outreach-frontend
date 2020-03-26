import dayjs from "dayjs";

const userIsLoggedIn = expectedType => {
  return (
    sessionStorage.getItem("token") !== null &&
    sessionStorage.getItem("type") !== null &&
    sessionStorage.getItem("type") === expectedType
  );
};

const generateDateString = rawDateString => {
  if (rawDateString === null) {
    return "";
  }
  return dayjs(rawDateString).format("dddd, MMMM D, YYYY, h:mmA");
};

export { userIsLoggedIn, generateDateString };
