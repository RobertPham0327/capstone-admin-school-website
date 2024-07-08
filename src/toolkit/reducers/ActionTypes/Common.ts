import { FETCH_ERROR, SHOW_MESSAGE } from "@crema/types/actions/Common.action";
import { createAction } from "@reduxjs/toolkit";

export const ShowMsgAction = createAction<string>(SHOW_MESSAGE);
export const FetchErrorAction = createAction<string>(FETCH_ERROR);
