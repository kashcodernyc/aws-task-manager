import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateTicket from "./components/tickets/CreateTicket";
import DisplayTickets from "./components/tickets/DisplayTickets";
import Register from "./components/auth/Register";
import AccountState from "./State/AccountState";
import Login from "./components/auth/Login";

function App() {
  return (
    <BrowserRouter>
      <AccountState>
        <div className="App">
          <Routes>
            <Route path="/tickets">
              <Route path="display" index element={<DisplayTickets />}></Route>
              <Route path="add" element={<CreateTicket />}></Route>
            </Route>
            <Route exact path="/register" element={<Register />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
          </Routes>
        </div>
      </AccountState>
    </BrowserRouter>
  );
}

export default App;
