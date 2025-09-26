import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";


const ConfirmationModal = ({
  onConfirm,
  onCancel,
  message,
  isVisible,
}) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [counter, setCounter] = useState(3);

  useEffect(() => {
    let timer;

    if (isVisible) {
      setIsDisabled(true);
      setCounter(3);

      timer = setInterval(() => {
        setCounter((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setIsDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <Modal
          open={isVisible}
          onCancel={onCancel}
          footer={[
            <Button key="cancel" onClick={onCancel}>
              Cancel
            </Button>,
            <Button
              key="confirm"
              type="primary"
              danger
              onClick={onConfirm}
              disabled={isDisabled}
            >
              {isDisabled ? `Delete in ${counter}s` : "Delete Permanently"}
            </Button>,
          ]}
        >
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg font-semibold text-center">{message}</p>
          </div>
    </Modal>
  );
};

export default ConfirmationModal;