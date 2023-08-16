import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TicketContext } from '../../Context/TicketContext';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import '../style.css';
import EditTicket from './EditTicket';

const TicketDetail = () => {
  const { setTicketData } = useContext(TicketContext)
  const [isEditingTicket, setIsEditingTicket] = useState(false);
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);

  const baseUrl = "https://c3lxl5iiuk.execute-api.us-east-1.amazonaws.com/prod";

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(`${baseUrl}/ticket?ticketId=${ticketId}`);
        const responseTicket = response.data;
        setTicket(responseTicket);
        console.log('Ticket:', responseTicket);
      } catch (error) {
        console.error('Error retrieving ticket:', error);
      }
    };

    fetchTicket();
  }, []);

  if (!ticket) {
    return <div>Loading...</div>;
  }

  const deleteTicket = async (ticketId) => {
    try {
      if (ticketId) {
        console.log(ticketId);
        await axios.delete(`${baseUrl}/ticket?ticketId=${ticketId}`);
        navigate('/tickets/display')
        setTicketData((prevTickets) => prevTickets.filter((ticket) => ticket.ticketId !== ticketId));
      } else {
        console.log('No ticket id found');
      }
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  };



  return (
    <div className='container'>
      <div className='sidebarContainer'>
        <Sidebar />
      </div>
      <div className='pageContent'>
        <Navbar />
        {isEditingTicket ? <EditTicket ticket={ticket} /> :
          <>
            <div className='header'>
              <h1>{ticket.subject}</h1>
              <div className='display-ticket-buttons'>
                <button className="form-button" onClick={() => setIsEditingTicket(true)}>Edit Ticket</button>
                <button className="delete-button" style={{ marginRight: '0px' }} onClick={() => deleteTicket(ticket.ticketId)}>Delete Ticket</button>
              </div>
            </div>
            <h4>Details</h4>
            <h4>Description</h4>
            <p>{ticket.description}</p>
            <h4>Add Comment</h4>
            <textarea />
            <h4>Comments</h4>
          </>
        }


      </div>
    </div>
  );
};

export default TicketDetail;
