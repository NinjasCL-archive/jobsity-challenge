import React, { useState, useEffect } from "react";
import Calendar, { makeEvent } from "./Calendar";

export default () => {
  const [currentEvent, setCurrentEvent] = useState(null);
  const [events, setEvents] = useState({});
  const [shouldShowForm, setShouldShowForm] = useState(false);
  const [
    shouldShowConfirmationModal,
    setShouldShowConfirmationModal,
  ] = useState(false);

  const close = () => {
    setShouldShowForm(false);
    setShouldShowConfirmationModal(false);
    setCurrentEvent(null);
  };

  const createNewEvent = ({ day }) => {
    console.log("Creating new Event", day.format());
    setCurrentEvent(makeEvent({ day }));
    setShouldShowForm(true);
  };

  const editEvent = ({ event }) => {
    console.log("Editing Event", event.day.format());
    setCurrentEvent(event);
    setShouldShowForm(true);
  };

  const beforeDeleteEvent = ({ event }) => {
    setShouldShowForm(false);
    setCurrentEvent(event);
    setShouldShowConfirmationModal(true);
  };

  const deleteEvent = ({ event }) => {
    console.log("Deleting Event", event.day.format());
    delete events[event.id];
    setEvents(events);
    close();
  };

  const saveEvent = ({ event }) => {
    console.log("Saving Event", event.day.format());
    events[event.id] = event;
    setEvents(events);
    close();
  };

  useEffect(() => {
    console.log("Events Triggered", { events });
  }, [events]);

  return (
    <Calendar
      events={events}
      states={{ currentEvent, shouldShowForm, shouldShowConfirmationModal }}
      actions={{
        createNewEvent,
        editEvent,
        deleteEvent,
        saveEvent,
        beforeDeleteEvent,
        close,
      }}
    />
  );
};
