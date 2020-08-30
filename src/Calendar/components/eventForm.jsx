import React from "react";

import {
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiButton,
  EuiText,
  EuiTitle,
  EuiCodeBlock,
} from "@elastic/eui";

export default ({ setIsFlyoutVisible }) => (
  <EuiFlyout
    ownFocus
    onClose={() => setIsFlyoutVisible(false)}
    aria-labelledby="flyoutTitle"
  >
    <EuiFlyoutHeader hasBorder>
      <EuiTitle size="m">
        <h2 id="flyoutTitle">A typical flyout</h2>
      </EuiTitle>
    </EuiFlyoutHeader>
    <EuiFlyoutBody>
      <EuiText>
        <p>
          For consistency across the many flyouts, please utilize the following
          code for implementing the flyout with a header.
        </p>
      </EuiText>
      <EuiCodeBlock language="html"></EuiCodeBlock>
    </EuiFlyoutBody>
  </EuiFlyout>
);
