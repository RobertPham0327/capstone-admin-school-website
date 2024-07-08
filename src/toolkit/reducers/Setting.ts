import { createAction, createReducer } from "@reduxjs/toolkit";
import { SET_INITIAL_PATH } from "@crema/types/actions/Settings.action";
import { Setting } from "@crema/types/models/Setting";

const initialSettings: Setting = {
  initialPath: "/",
};

export const SetInitialPathAction = createAction<string>(SET_INITIAL_PATH);

const settingsReducer = createReducer(initialSettings, (builder) => {
  builder.addCase(SetInitialPathAction, (state, action) => {
    state.initialPath = action.payload;
  });
});

export default settingsReducer;
