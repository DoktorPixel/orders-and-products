"use client";

import { useEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { connectSessionCounter } from "@/services/socket";
import { setLocale } from "@/store/settingsSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { t } from "@/lib/i18n";
import styles from "./TopMenu.module.scss";

type TokenPayload = {
  name?: string;
  exp?: number;
};

const STORAGE_LOCALE_KEY = "orders_products_locale";
const STORAGE_TOKEN_KEY = "orders_products_token";

const fallbackToken =
  "eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJuYW1lIjoiQ2FuZGlkYXRlIiwiZXhwIjo0MTAyNDQ0ODAwfQ.";

export default function TopMenu() {
  const [time, setTime] = useState(new Date());
  const [sessions, setSessions] = useState(1);
  const [isSocketFallback, setIsSocketFallback] = useState(false);
  const locale = useAppSelector((s) => s.settings.locale);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_LOCALE_KEY);
    if (stored === "ru" || stored === "en") {
      dispatch(setLocale(stored));
    }
  }, [dispatch]);

  useEffect(() => {
    const cleanup = connectSessionCounter((count, fallback) => {
      setSessions(count);
      setIsSocketFallback(fallback);
    });

    return cleanup;
  }, []);

  const localeView = useMemo(() => (locale === "ru" ? "ru-RU" : "en-US"), [locale]);
  const username = useMemo(() => {
    if (typeof window === "undefined") return "Candidate";
    const token = localStorage.getItem(STORAGE_TOKEN_KEY) ?? fallbackToken;
    localStorage.setItem(STORAGE_TOKEN_KEY, token);
    try {
      const payload = jwtDecode<TokenPayload>(token);
      return payload.name ?? "Candidate";
    } catch {
      return "Candidate";
    }
  }, []);

  const onLocaleChange = (nextLocale: "ru" | "en") => {
    dispatch(setLocale(nextLocale));
    localStorage.setItem(STORAGE_LOCALE_KEY, nextLocale);
  };

  return (
    <header className={styles.topmenu}>
      <div className={styles.topmenu__left}>
        <span className={styles.topmenu__label}>
          {t(locale, "user")}: {username}
        </span>
      </div>
      <div className={styles.topmenu__right}>
        <div className={styles.topmenu__time}>
          {time.toLocaleDateString(localeView)} {time.toLocaleTimeString(localeView)}
        </div>
        <div className={styles.topmenu__sessions}>
          {t(locale, "activeSessions")}: {sessions}
          {isSocketFallback ? ` (${t(locale, "tabCounterFallback")})` : ""}
        </div>
        <div className={styles.topmenu__lang}>
          <span>{t(locale, "language")}:</span>
          <button
            type="button"
            onClick={() => onLocaleChange("ru")}
            className={locale === "ru" ? styles.topmenu__lang_active : ""}
          >
            RU
          </button>
          <button
            type="button"
            onClick={() => onLocaleChange("en")}
            className={locale === "en" ? styles.topmenu__lang_active : ""}
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
}
