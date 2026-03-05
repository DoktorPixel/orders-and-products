import { io } from "socket.io-client";

type SessionsListener = (count: number, fallback: boolean) => void;

const TAB_CHANNEL = "orders_products_tabs";
const TAB_STORAGE_KEY = "orders_products_tab_heartbeat";

const randomId = (): string =>
  `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export const socket = io("http://localhost:4000", {
  autoConnect: true,
  reconnection: true,
  transports: ["websocket"],
});

export const connectSessionCounter = (listener: SessionsListener) => {
  let useFallback = false;
  const tabId = randomId();
  const bc =
    typeof window !== "undefined" && "BroadcastChannel" in window
      ? new BroadcastChannel(TAB_CHANNEL)
      : null;

  const readAllTabs = (): string[] => {
    if (typeof window === "undefined") return [];
    const payload = localStorage.getItem(TAB_STORAGE_KEY);
    if (!payload) return [];
    try {
      const data = JSON.parse(payload) as Record<string, number>;
      const now = Date.now();
      return Object.entries(data)
        .filter(([, stamp]) => now - stamp < 5000)
        .map(([id]) => id);
    } catch {
      return [];
    }
  };

  const writeTabStamp = (id: string, remove = false) => {
    if (typeof window === "undefined") return;
    const payload = localStorage.getItem(TAB_STORAGE_KEY);
    const data = payload
      ? (JSON.parse(payload) as Record<string, number>)
      : ({} as Record<string, number>);
    if (remove) {
      delete data[id];
    } else {
      data[id] = Date.now();
    }
    localStorage.setItem(TAB_STORAGE_KEY, JSON.stringify(data));
  };

  const emitLocalCount = () => listener(readAllTabs().length, true);

  const heartbeat = () => {
    writeTabStamp(tabId);
    emitLocalCount();
    bc?.postMessage("refresh");
  };

  const onLocalMessage = () => emitLocalCount();

  const onSocketSessions = (count: number) => {
    if (!useFallback) {
      listener(count, false);
    }
  };

  const enableFallback = () => {
    if (useFallback) return;
    useFallback = true;
    heartbeat();
  };

  socket.on("sessions", onSocketSessions);
  socket.on("connect_error", enableFallback);
  socket.on("disconnect", enableFallback);

  bc?.addEventListener("message", onLocalMessage);
  window.addEventListener("storage", onLocalMessage);
  writeTabStamp(tabId);
  emitLocalCount();

  const timer = window.setInterval(() => {
    if (useFallback) {
      heartbeat();
    }
  }, 2000);

  return () => {
    clearInterval(timer);
    socket.off("sessions", onSocketSessions);
    socket.off("connect_error", enableFallback);
    socket.off("disconnect", enableFallback);
    window.removeEventListener("storage", onLocalMessage);
    bc?.removeEventListener("message", onLocalMessage);
    bc?.close();
    writeTabStamp(tabId, true);
    emitLocalCount();
  };
};
