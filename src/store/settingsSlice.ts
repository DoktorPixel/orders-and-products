import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Locale } from "@/lib/i18n";

type SettingsState = {
  locale: Locale;
};

const initialState: SettingsState = {
  locale: "ru",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setLocale(state, action: PayloadAction<Locale>) {
      state.locale = action.payload;
    },
  },
});

export const { setLocale } = settingsSlice.actions;
export default settingsSlice.reducer;
