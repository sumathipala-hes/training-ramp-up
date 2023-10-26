import React from "react";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function handleSocketMessage(data: string) {
    toast.success(data, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
}

export default function Notification() {
    useEffect(() => {
        const socket = io("http://localhost:4000");

        socket.on("message", handleSocketMessage);

        return () => {
            socket.disconnect();
        };
    }, []);

    return <ToastContainer />;
}
