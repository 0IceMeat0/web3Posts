import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "@/shared/api";
import authReducer, { loadAuthState } from "@/features/auth/model/auth-slice";
import toastReducer from "./toast-slice";

/** Creates and configures the Redux store with auth, toast, and API */
export function makeStore() {
  return configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      auth: authReducer,
      toast: toastReducer,
    },
    preloadedState: {
      auth: loadAuthState(),
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
