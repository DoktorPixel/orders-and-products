"use client";
import { useEffect, useState } from "react";
import { socket } from "@/services/socket";
import styles from "./TopMenu.module.scss";

export default function TopMenu() {
  const [time, setTime] = useState(new Date());
  const [sessions, setSessions] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    socket.on("sessions", setSessions);
    return () => {
      clearInterval(timer);
      socket.off("sessions");
    };
  }, []);

  return (
    <header className={styles.topmenu}>
      <div>Поиск</div>
      <div>
        {time.toLocaleDateString()} {time.toLocaleTimeString()}
        <div>Активные вкладки: {sessions}</div>
      </div>
    </header>
  );
}
