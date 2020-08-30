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
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
} from "@elastic/eui";

import moment from "moment";
import makeCalendar from "./utils/makeCalendar";

import "./Calendar.css";

const makeCalendarItem = ({
  day = moment(),
  current = moment(),
  events = [],
  index = 0,
} = {}) => {
  const isToday = day.format("DDMMYYYY") === current.format("DDMMYYYY");
  const isWeekend = day.format("d") === "6" || day.format("d") === "0";
  const dayNumber = day.format("DD");

  return (
    <li
      key={index}
      className={
        day.format("MM") === current.format("MM") ? "day" : "day other-month"
      }
      onDoubleClick={() => console.log("Double Click", day.format())}
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
                console.log("cross");
              }}
              onClick={() => {
                console.log("badge");
              }}
              iconOnClickAriaLabel="Click this icon to..."
            >
              Badge with iconOnClick being truncated
            </EuiBadge>
          ))}
        </EuiBadgeGroup>
      </div>
    </li>
  );
};

const View = ({ current = moment() }) => {
  const calendar = makeCalendar({ current });
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
                  makeCalendarItem({ day, index: index2 })
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
