import React from "react";
import { EuiBadge, EuiBadgeGroup } from "@elastic/eui";
import EventForm from "./EventForm";

import moment from "moment";

const CalendarCell = ({
  day = moment(),
  current = moment(),
  events = {},
  states = {},
  actions = {},
} = {}) => {
  const isToday = day.format("DDMMYYYY") === current.format("DDMMYYYY");
  const isWeekend = day.format("d") === "6" || day.format("d") === "0";
  const dayNumber = day.format("DD");

  const { createNewEvent, editEvent, beforeDeleteEvent, saveEvent } = actions;
  const { currentEvent } = states;

  return (
    <li
      className={
        day.format("MM") === current.format("MM") ? "day" : "day other-month"
      }
      onDoubleClick={() => createNewEvent({ day })}
    >
      <div className="date">
        {isToday ? (
          <EuiBadge color="accent">{dayNumber}</EuiBadge>
        ) : isWeekend ? (
          <span className="weekend">{dayNumber}</span>
        ) : (
          dayNumber
        )}
      </div>
      <div className="event eui-yScrollWithShadows">
        <EuiBadgeGroup gutterSize="none">
          {Object.values(events)
            .filter(
              (event) => event.day.format("DDMMYY") === day.format("DDMMYY")
            )
            .sort((ev1, ev2) => {
              const dayA = ev1.day.unix();
              const dayB = ev2.day.unix();
              if (dayA < dayB) {
                return -1;
              }

              if (dayA > dayB) {
                return 1;
              }

              return 0;
            })
            .map((event, index) => (
              <EuiBadge
                key={index}
                iconType="cross"
                iconSide="right"
                iconOnClickAriaLabel="Delete Event"
                iconOnClick={() => {
                  beforeDeleteEvent({ event });
                }}
                onClickAriaLabel="Edit Event"
                onClick={() => {
                  editEvent({ event });
                }}
                color={event.color}
              >
                {event.title}
                {currentEvent && event && currentEvent.id === event.id ? (
                  <EventForm event={currentEvent} save={saveEvent} />
                ) : null}
              </EuiBadge>
            ))}
        </EuiBadgeGroup>
      </div>
    </li>
  );
};

export { CalendarCell };
export default CalendarCell;
