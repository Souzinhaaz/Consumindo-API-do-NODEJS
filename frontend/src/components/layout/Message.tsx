import { useState, useEffect } from "react";

interface MessageProps {
  type: String;
  msg: String;
}

export const Message = ({ type, msg }: MessageProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!msg) {
      setVisible(false);
      return;
    }

    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [msg]);

  return (
    <>
      {visible && (
        <div
          className={
            type == "success"
              ? "max-w-4xl mx-auto mb-5 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
              : "max-w-4xl mx-auto mb-5 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          }
          role="alert"
        >
          <span className="block sm:inline">{msg}</span>
        </div>
      )}
    </>
  );
};
