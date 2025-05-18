import { Button } from "@/components/ui";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./Auth/Login";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<h1>Hello</h1>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
