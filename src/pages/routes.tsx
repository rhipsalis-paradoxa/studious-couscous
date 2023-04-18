
import { Route, Routes } from "react-router-dom";
import Editor from "./editor";
import Home from "./home";
import React from "react";
import RecentlyDeleted from "./recently-deleted";

  

// All the places you can go!
const AllRoutes = () => {
  return (
    <>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/editor/:title" element={<Editor/>}/>
      <Route path="/recently-deleted" element={<RecentlyDeleted/>}/>
      </Routes>
    </>
  );
}; 

export default AllRoutes;