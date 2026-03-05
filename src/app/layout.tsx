"use client";
import { Provider } from "react-redux";
import { store } from "@/store";
import Navigation from "@/components/Navigation/Navigation";
import TopMenu from "@/components/TopMenu/TopMenu";
import RouteTransition from "@/components/RouteTransition/RouteTransition";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <Provider store={store}>
          <div className="app">
            <Navigation />
            <div className="app__content">
              <TopMenu />
              <main className="app__main">
                <RouteTransition>{children}</RouteTransition>
              </main>
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
