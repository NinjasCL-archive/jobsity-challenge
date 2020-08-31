import React from "react";

import { EuiConfirmModal, EuiOverlayMask } from "@elastic/eui";

const ConfirmDeleteModal = ({ event, close, remove }) => (
  <EuiOverlayMask>
    <EuiConfirmModal
      title="¿Delete Event?"
      onCancel={() => close()}
      onConfirm={() => remove({ event })}
      cancelButtonText="No, don't do it"
      confirmButtonText="Yes, do it"
      defaultFocusedButton="confirm"
    >
      <p>
        {event.title} - {event.day.format("DD/MM/YYYY H:m:s")}
      </p>
      <p>Are you sure you want to do this?</p>
    </EuiConfirmModal>
  </EuiOverlayMask>
);

export { ConfirmDeleteModal };
export default ConfirmDeleteModal;
