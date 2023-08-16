import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'
import UserPool from '../../State/UserPool';
import Sidebar from '../sidebar/Sidebar'
import Navbar from '../navbar/Navbar'


const EditTicket = ({ ticket }) => {
    const { ticketId } = useParams();
    const user = UserPool.getCurrentUser();
    const [ticketData, setTicketData] = useState({
        ticketId: ticket.ticketId,
        subject: ticket.subject,
        reporter: user?.storage.name || '',
        status: ticket.status,
        description: ticket.description,
        assignee: ticket.assignee,
        userId: user?.username || '',
        timestamp: ticket.timestamp,
    });

    const options = ["Open", "In Progress", "Resolved", "Closed"]
    const baseUrl = "https://c3lxl5iiuk.execute-api.us-east-1.amazonaws.com/prod";


    const handleChange = (e) => {
        const { name, value } = e.target;
        setTicketData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const updateTicket = async () => {
        try {
            await axios.put(`${baseUrl}/ticket?ticketId=${ticketId}`, ticketData);
            console.log(ticketData);
        } catch (error) {
            console.error('Error updating ticket:', error);
        }
    };

    return (
        <>
            <div className='header'>
                <h1>Edit Ticket</h1>
            </div>
            <form onSubmit={updateTicket}>
                <label htmlFor="subject">Subject:</label>
                <input
                    type="text"
                    name="subject"
                    value={ticketData.subject}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="status">Status:</label>
                <select
                    value={ticketData.status}
                    onChange={handleChange}
                    name="status"
                    required
                >
                    {options.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
                <label htmlFor="description">Description:</label>
                <textarea
                    name="description"
                    value={ticketData.description}
                    onChange={handleChange}
                />

                <label htmlFor="assignee">Assignee:</label>
                <input
                    type="text"
                    name="assignee"
                    value={ticketData.assignee}
                    onChange={handleChange}
                />

                <button className="form-button" type="submit">Update Ticket</button>
            </form>
        </>
    )
}

export default EditTicket