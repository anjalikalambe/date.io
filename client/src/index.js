import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MeetingRooms from "./components/Rooms/MeetingRooms/MeetingRooms";

ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<Route path="/" exact component={App} />
			<Route path="/rooms" component={MeetingRooms} />
		</Switch>
	</BrowserRouter>,

	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
