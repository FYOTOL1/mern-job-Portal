import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const persiststore = persistStore(store)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persiststore}>
        <App />
      </PersistGate>
      <Toaster />
    </Provider>
  </StrictMode>
);
