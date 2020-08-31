import React from "react";
import moment from "moment";

import {
  EuiTitle,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
} from "@elastic/eui";

import CalendarCell from "./components/CalendarCell";
import EventForm from "./components/EventForm";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";

import makeCalendar from "./utils/makeCalendar";

import "./Calendar.css";

const View = ({
  current = moment(),
  actions = {},
  events = [],
  states = {},
}) => {
  const calendar = makeCalendar({ current });
  const { currentEvent, shouldShowForm, shouldShowConfirmationModal } = states;
  const { saveEvent, deleteEvent, close } = actions;
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
            {currentEvent && shouldShowForm ? (
              <EventForm event={currentEvent} save={saveEvent} />
            ) : null}
            {currentEvent && shouldShowConfirmationModal ? (
              <ConfirmDeleteModal
                event={currentEvent}
                close={close}
                remove={deleteEvent}
              />
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
                {week.days.map((day, index2) => (
                  <CalendarCell
                    day={day}
                    current={current}
                    actions={actions}
                    states={states}
                    events={events}
                    index={index2}
                  />
                ))}
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
