import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "antd/dist/antd.css";
import "./index.scss";
import Book from "./components/BookPage";
import CreateTrail from "./components/Trail/CreateTrail";
import LinesTrail from "./components/Trail/LinesTrail";
import ReviewTrail from "./components/Trail/ReviewTrail";
import ListTrail from "./components/Trail/ListTrail";

import Feed from "./components/Feed/Feed";
import File from "./components/File/File";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import UserProfile from "./components/User/UserProfile";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";

import RequireAuth from "./components/Auth/RequireAuth";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import store from "./reduxStore";
const Root = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/books"
          element={
            <RequireAuth redirectTo="/signin">
              <Book />
            </RequireAuth>
          }></Route>
        <Route
          path="trail/create"
          element={
            <RequireAuth redirectTo="/signin">
              <CreateTrail />
            </RequireAuth>
          }
        />
        <Route path="trail/:id" element={<LinesTrail />} />
        <Route
          path="trail/list"
          element={
            <RequireAuth redirectTo="/signin">
              <ListTrail />
            </RequireAuth>
          }
        />
        <Route
          path="trail/review"
          element={
            <RequireAuth redirectTo="/signin">
              <ReviewTrail />
            </RequireAuth>
          }
        />
        <Route path="/feed" element={<Feed />}></Route>
        <Route path="/file/:id" element={<File />}></Route>
        <Route path="/profile" element={<UserProfile />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById("root")
);
