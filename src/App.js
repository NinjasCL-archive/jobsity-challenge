import React, { useState, useEffect } from "react";
import Calendar from "./Calendar";

export default () => {
  const [eventForm, setEventForm] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {}, [eventForm]);

  return <Calendar />;
};
