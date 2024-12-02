export const validate = (values) => {
  const newObj = Object.entries(values).filter((el) => el[1] === "");
  const errors = newObj.map((el) => el[0]);
  if (errors.length > 0) return false;
  return true
};

