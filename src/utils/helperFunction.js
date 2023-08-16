import { styled } from "@mui/system";

const getStatusBackgroundColor = (status) => {
  switch (status) {
    case "Backlog":
      return "lightgray";
    case "Open":
      return "orange";
    case "In Progress":
      return "skyblue";
    case "Resolved":
      return "rgb(0, 197, 53)";
    case "Closed":
      return "#F75D59";
    default:
      return "";
  }
};

export const CustomCell = styled("div")(({ value }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  paddingLeft: "8px",
  backgroundColor: getStatusBackgroundColor(value),
}));

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toDateString();
};
