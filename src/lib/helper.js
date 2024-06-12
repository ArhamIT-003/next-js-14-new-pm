export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const formatDate = (date) => {
  // 1. Convert to Date object if it's a string
  const dateObj = typeof date === "string" ? new Date(date) : date;

  // 2. Extract date components (with optional chaining for safety)
  const month = dateObj?.toLocaleString("en-US", { month: "short" });
  const day = dateObj?.getDate();
  const year = dateObj?.getFullYear();

  // 3. Handle invalid dates and format the output
  return !day || !month || !year ? "Invalid Date" : `${day}-${month}-${year}`;
};

export function dateFormatter(dateString) {
  const inputDate = new Date(dateString);

  if (isNaN(inputDate)) {
    return "Invalid Date";
  }

  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, "0");
  const day = String(inputDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}
