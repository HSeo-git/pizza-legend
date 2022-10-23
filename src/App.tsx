import React from "react";
import { RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import router from "./router/router";

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </RecoilRoot>
  );
}

export default App;
