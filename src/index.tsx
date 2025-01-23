import { Reducer } from "react";
import ReactDOM from "react-dom/client";
import { applyMiddleware, createStore } from "redux";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { thunk } from "redux-thunk";
import App from "./components/App/App";
import { rootReducer } from "./services/reducers";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

const store = createStore(
  rootReducer as Reducer<unknown, unknown>,
  applyMiddleware(thunk)
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
