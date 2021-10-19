import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MeetingRooms from "./components/Rooms/MeetingRooms/MeetingRooms";
import Room from "./components/Room/Room";
import LoginPage from "./pages/Login/LoginPage";
import RegistrationPage from "./pages/Register/RegistrationPage";
import { StoreProvider } from "./stores/helpers/StoreContext";
import { createStore } from "./stores/helpers/CreateStore";

const rootStore = createStore();

ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<Route path="/" exact component={App} />
			<Route path="/rooms" component={MeetingRooms} />
			<Route path="/room" component={Room} />
		</Switch>
	</BrowserRouter>,


	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
