import { htmlIdGenerator } from "@elastic/eui/lib/services";

const makeEvent = ({ day, title = "No Title", location = "Unknown" }) => ({
  day: day.clone(),
  id: htmlIdGenerator()(),
  title,
  location,
  color: "#3c3c3c",
});

export { makeEvent };
export default makeEvent;
