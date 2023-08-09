
const maxDate = () => {
  const currentDate = new Date();
  const maxAllowedDate = new Date(
    currentDate.getFullYear() - 18,
    currentDate.getMonth(),
    currentDate.getDate()
  );
  return maxAllowedDate.toISOString().split("T")[0];
};


const minDate = () => {
  const minAllowedDate = new Date(1900, 0, 1);
  return minAllowedDate.toISOString().split("T")[0];
};

export { maxDate, minDate };
