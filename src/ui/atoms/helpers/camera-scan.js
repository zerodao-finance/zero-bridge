import { useState } from "react";
import QrReader from "react-qr-scanner";

function CameraScan({ onScan }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleScan = (data) => {
    if (data) {
      const address = data.text.includes(":")
        ? data.text.split(":")[1]
        : data.text;
      const e = { target: { value: address } };
      onScan(e);

      if (data.text !== "") {
        setIsOpen(false);
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
    alert("Error scanning QR code. Please type it in instead.");
  };

  return (
    <>
      {!isOpen ? (
        <div
          onClick={() => setIsOpen(true)}
          className="flex items-center grayscale invert cursor-pointer"
        >
          <img src="/qr-code.png" alt="qr code" height="40" width="40" />
        </div>
      ) : (
        <div className="absolute left-0 top-0">
          <QrReader
            delay={200}
            onError={handleError}
            onScan={handleScan}
            legacyMode={true}
            style={{
              borderRadius: "10px",
            }}
          />
        </div>
      )}
    </>
  );
}

export default CameraScan;
