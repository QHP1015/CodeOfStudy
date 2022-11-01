import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BaseUse, FormDemo, LazyUse } from "./components/baseUse";

function App() {
  return (
    <div className='App'>
      <BaseUse />
      <FormDemo />
      <LazyUse />
    </div>
  );
}

export default App;
