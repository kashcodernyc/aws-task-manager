import React, { useState, useEffect } from 'react';
import axios from 'axios';
const DisplayTickets = () => {
    const [ticketData, setTicketData] = useState([])

    const baseUrl = "https://c3lxl5iiuk.execute-api.us-east-1.amazonaws.com/prod"
    // useEffect(() => {
    //     const fetchTickets = async () => {
    //         try {
    //             const response = await axios.get(`${baseUrl}/tickets`);
    //             const tickets = response.data;
    //             console.log('All tickets:', tickets);
    //             // Handle the retrieved tickets data
    //         } catch (error) {
    //             console.error('Error retrieving tickets:', error);
    //         }
    //     };
    //     fetchTickets();
    // }, [])
    useEffect(() => {
        const fetchTicket = async () => {
            // const ticketId = "6203fce0-8bba-4d23-8eb0-10da10032d3e";
            try {
                const response = await axios.get(`${baseUrl}/tickets`);
                const tickets = response.data.tickets;
                setTicketData(tickets)
                console.log('Tickets:', tickets);
                // Handle the retrieved ticket data
            } catch (error) {
                console.error('Error retrieving ticket:', error);
            }
        };

        fetchTicket()

    }, [])




    return (
        <div>
            {ticketData?.map((ticket) => {
                return (
                    <div key={ticket.ticketId}>{ticket.subject}</div>
                )
            })}
            {/* <button onClick={fetchTicket}>Fetch Ticket</button> */}
        </div>
    );
}

export default DisplayTickets