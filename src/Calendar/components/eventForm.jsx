import React, { useState, useEffect } from "react";
import { weather as API } from "../../http";
import { debounce } from "lodash";

import {
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiTitle,
  EuiForm,
  EuiFormRow,
  EuiFieldText,
  EuiColorPicker,
  EuiDatePicker,
} from "@elastic/eui";

import { useColorPickerState } from "@elastic/eui/lib/services";

export default ({ event, save }) => {
  const [startDate, setStartDate] = useState(event.day);

  const handleDateChange = (day) => {
    setStartDate(day);
    event.day = day;
  };

  const [color, setColor, errors] = useColorPickerState(event.color);

  useEffect(() => {
    event.color = color;
  }, [color]);

  const [title, setTitle] = useState(event.title);

  const handleTitleChange = ({ target: { value } }) => {
    event.title = value;
    setTitle(value);
  };

  const [location, setLocation] = useState(event.location);

  let weather = API.queries.get.default;

  const locationQuery = (
    { target: { value } } = { target: { value: event.location } }
  ) => {
    if (value) {
      API.queries.get.query({ city: value }).then((result) => {
        console.log("Got Result", result);
        weather = result;
        setLocation(value);
      });
    }
  };

  const handleLocationChange = ({ target: { value } }) => {
    event.location = value;
    setLocation(value);
  };

  return (
    <EuiFlyout ownFocus onClose={() => save({ event })} aria-labelledby="Event">
      <EuiFlyoutHeader hasBorder>
        <EuiTitle size="m">
          <h2 id="flyoutTitle">Event</h2>
        </EuiTitle>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        <EuiForm component="form">
          <EuiFormRow label="Title">
            <EuiFieldText
              icon="user"
              placeholder="My Event"
              value={title}
              onChange={handleTitleChange}
              maxLength={30}
              autoFocus
            />
          </EuiFormRow>

          <EuiFormRow label="Location">
            <EuiFieldText
              icon="user"
              placeholder="New York"
              onChange={handleLocationChange}
              onBlur={locationQuery}
              value={location}
            />
          </EuiFormRow>

          <EuiFormRow label="Event on">
            <EuiDatePicker
              showTimeSelect
              selected={startDate}
              onChange={handleDateChange}
            />
          </EuiFormRow>

          <EuiFormRow label="Pick a color" isInvalid={!!errors} error={errors}>
            <EuiColorPicker
              onChange={setColor}
              color={color}
              isInvalid={!!errors}
            />
          </EuiFormRow>

          {!weather.isDefault ? (
            <EuiFormRow label={"Weather In " + weather.name}>
              {weather.temp} {weather.main}
            </EuiFormRow>
          ) : null}
        </EuiForm>
      </EuiFlyoutBody>
    </EuiFlyout>
  );
};
