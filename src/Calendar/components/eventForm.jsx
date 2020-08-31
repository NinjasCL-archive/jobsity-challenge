import React from "react";

import {
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiButton,
  EuiText,
  EuiTitle,
} from "@elastic/eui";

export default ({ event, save }) => {
  console.log("Editing", { event });

  return (
    <EuiFlyout ownFocus onClose={() => save({ event })} aria-labelledby="Event">
      <EuiFlyoutHeader hasBorder>
        <EuiTitle size="m">
          <h2 id="flyoutTitle">A typical flyout</h2>
        </EuiTitle>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        <EuiText>
          <p>
            For consistency across the many flyouts, please utilize the
            following code for implementing the flyout with a header.
          </p>
        </EuiText>
      </EuiFlyoutBody>
    </EuiFlyout>
  );
};
