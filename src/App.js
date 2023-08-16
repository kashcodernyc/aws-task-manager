import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import CreateTicket from "./components/tickets/CreateTicket";
import DisplayTickets from "./components/tickets/DisplayTickets";
import TicketDetail from "./components/tickets/TicketDetail";
import Register from "./components/auth/Register";
import AccountState from "./State/AccountState";
import Login from "./components/auth/Login";
import PrivateRoutes from "./utils/privateRoute";
import { TicketContext } from "./Context/TicketContext";

function App() {
  const [ticketData, setTicketData] = useState([]);
  const baseUrl = "https://c3lxl5iiuk.execute-api.us-east-1.amazonaws.com/prod";

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(`${baseUrl}/tickets`);
        const tickets = response.data.tickets;
        setTicketData(tickets);
        console.log("Tickets:", tickets);
        // Handle the retrieved ticket data
      } catch (error) {
        console.error("Error retrieving ticket:", error);
      }
    };

    fetchTickets();
  }, []);
  return (
    <BrowserRouter>
      <AccountState>
        <TicketContext.Provider value={{ ticketData, setTicketData }}>
          <div className="App">
            <Routes>
              {/* Tickets Routes */}
              <Route path="/tickets/*">
                {/* Create a new ticket */}
                <Route element={<PrivateRoutes />}>
                  {/* Display all tickets */}
                  <Route path="display" element={<DisplayTickets />} />
                  {/* Display individual ticket */}
                  <Route path=":ticketId" element={<TicketDetail />} />
                  <Route path="add" element={<CreateTicket />} />
                </Route>
              </Route>
              {/* Auth Routes */}
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </TicketContext.Provider>
      </AccountState>
    </BrowserRouter>
  );
}

export default App;
