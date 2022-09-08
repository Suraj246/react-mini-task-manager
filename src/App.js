import "./App.css";
import React, { useState } from "react";
import AddTask from "./components/AddTask";
import ShowTask from "./components/ShowTask";

function App() {
  return (
    <div>
      <AddTask />
      {/* <ShowTask addTask={addTask} /> */}
    </div>
  );
}

export default App;
