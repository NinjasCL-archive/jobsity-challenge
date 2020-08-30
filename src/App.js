import React, { useState, useEffect } from "react";
import Calendar, { makeEvent } from "./Calendar";

export default () => {
  const [currentEvent, setCurrentEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [shouldShowForm, setShouldShowForm] = useState(false);

  const createNewEvent = ({ day }) => {
    console.log("Creating new Event", day.format());
    setCurrentEvent(makeEvent({ day }));
  };

  const editEvent = ({ event }) => {
    console.log("Editing Event", event.day.format());
    setCurrentEvent(event);
  };

  const deleteEvent = ({ event }) => {
    console.log("Deleting Event", event.day.format());
    setCurrentEvent(event);
  };

  const saveEvent = ({ event }) => {
    console.log("Saving Event", event.day.format());
    setCurrentEvent(null);
  };

  useEffect(() => {
    console.log({ currentEvent });
    if (!currentEvent) {
      return setShouldShowForm(false);
    }

    setShouldShowForm(true);
  }, [currentEvent]);

  return (
    <Calendar
      events={events}
      states={{ currentEvent, shouldShowForm }}
      actions={{ createNewEvent, editEvent, deleteEvent, saveEvent }}
    />
  );
};
