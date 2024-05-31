import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {QueryClient, QueryClientProvider} from "react-query";
import store from "./redux/store.ts";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {persistStore} from "redux-persist";
import {AppContextProvider} from "./contexts/AppContext.tsx";
import {SearchContextProvider} from "./contexts/SearchContext.tsx";
import {ThemeProvider} from "./contexts/ThemeContext.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

const persitor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persitor}>
        <QueryClientProvider client={queryClient}>
          <AppContextProvider>
            <SearchContextProvider>
              <ThemeProvider>
                <App />
              </ThemeProvider>
            </SearchContextProvider>
          </AppContextProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
