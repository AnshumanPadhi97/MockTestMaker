import React from "react";
import { Toaster } from "react-hot-toast";
import Master from "./Master";

function App() {
  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
        <Master />
      </div>
    </>
  );
}

export default App;
