import { Middleware } from "redux"

export const actionLog: Middleware = (store) => (next) => (action) => {
    console.log("state now", store.getState());
    console.log("action", action);
    next(action);
    console.log("state after", store.getState());
}