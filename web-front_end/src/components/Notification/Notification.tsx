import React from "react";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notification = () => {
  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("message", (data: string) => {
      toast("✅ " + data, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return <ToastContainer />;
};

export default Notification;
