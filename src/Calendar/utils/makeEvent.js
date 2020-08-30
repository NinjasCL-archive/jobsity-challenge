import { htmlIdGenerator } from "@elastic/eui/lib/services";

const makeEvent = ({ day, title = "", location = "" }) => ({
  day: day.clone(),
  id: htmlIdGenerator()(),
  title,
  location,
  isNew: true,
});

export { makeEvent };
export default makeEvent;
