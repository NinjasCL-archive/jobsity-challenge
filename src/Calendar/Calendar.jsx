import React from "react";
import {
  EuiBadge,
  EuiBadgeGroup,
  EuiTitle,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
} from "@elastic/eui";

import moment from "moment";
import makeCalendar from "./utils/makeCalendar";
import EventForm from "./components/EventForm";

import "./Calendar.css";

const makeCalendarItem = ({
  day = moment(),
  current = moment(),
  events = [],
  index = 0,
  states = {},
  actions = {},
} = {}) => {
  const isToday = day.format("DDMMYYYY") === current.format("DDMMYYYY");
  const isWeekend = day.format("d") === "6" || day.format("d") === "0";
  const dayNumber = day.format("DD");

  const { createNewEvent, editEvent, deleteEvent, saveEvent } = actions;
  const { currentEvent } = states;

  return (
    <li
      key={index}
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
          {events.map((event) => (
            <EuiBadge
              iconType="cross"
              iconSide="right"
              iconOnClick={() => {
                editEvent({ event });
              }}
              onClick={() => {
                deleteEvent({ event });
              }}
              iconOnClickAriaLabel="Click this icon to..."
            >
              Badge with iconOnClick being truncated
              {currentEvent.id === event.id ? (
                <EventForm event={currentEvent} save={saveEvent} />
              ) : null}
            </EuiBadge>
          ))}
        </EuiBadgeGroup>
      </div>
    </li>
  );
};

const View = ({
  current = moment(),
  actions = {},
  events = [],
  states = {},
}) => {
  const calendar = makeCalendar({ current });
  const { currentEvent, shouldShowForm } = states;
  const { saveEvent } = actions;
  return (
    <>
      <EuiPage>
        <EuiPageBody component="div">
          <EuiPageContent verticalPosition="center" horizontalPosition="center">
            <EuiPageContentHeader>
              <EuiPageContentHeaderSection>
                <EuiTitle>
                  <h2>{current.format("MMMM - YYYY")}</h2>
                </EuiTitle>
              </EuiPageContentHeaderSection>
            </EuiPageContentHeader>
            {shouldShowForm ? (
              <EventForm event={currentEvent} save={saveEvent} />
            ) : null}
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
      <div id="calendar-wrap">
        <div id="calendar">
          <ul id="calendar-header" className="weekdays">
            <li>Sunday</li>
            <li>Monday</li>
            <li>Tuesday</li>
            <li>Wednesday</li>
            <li>Thursday</li>
            <li>Friday</li>
            <li>Saturday</li>
          </ul>
          {Object.keys(calendar).map((key, index) => {
            const week = calendar[key];
            return (
              <ul key={index} className="days">
                {week.days.map((day, index2) =>
                  makeCalendarItem({
                    day,
                    actions,
                    states,
                    events,
                    index: index2,
                  })
                )}
              </ul>
            );
          })}
        </div>
      </div>
    </>
  );
};

export { View };
export default View;
