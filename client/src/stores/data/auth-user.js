import { flow, makeAutoObservable } from "mobx";
import { persist } from "mobx-persist";
import axios from "axios";

export default class UserAuth {
  @persist
  loggedIn = false;

  @persist
  username = false;

  @persist
  token = "";

  loading = true;

  constructor() {
    makeAutoObservable(this, {
      validateToken: flow,
    });
  }

  login({ username, token }, cb) {
    this.loggedIn = true;
    this.username = username;
    this.token = token;
    if (cb) {
      cb();
    }
  }

  *validateToken() {
    if (!localStorage.data) {
      // console.log('localstorage has a null value!');
      return null;
    }
    let res = yield axios.get("http://localhost:5000/user/verifyToken", {
      headers: {
        authorization: JSON.parse(localStorage.data).token,
      },
    });
    // console.log("token post verification leaves user: " + this.loggedIn);
    if (!res.data.success) {
      // console.log('token could not be validated!');
      this.logout();
    }
  }

  logout(cb) {
    this.loggedIn = false;
    this.userid = "";
    this.token = "";
    localStorage.clear();
    if (cb) {
      cb();
    }
  }
}
