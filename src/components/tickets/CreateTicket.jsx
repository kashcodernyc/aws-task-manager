import React, { useContext, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from "@mui/styles";
import AccountContext from '../../Context/AccountContext';
import UserPool from '../../State/UserPool';
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';
import '../style.css';




const CreateTicket = () => {
    const context = useContext(AccountContext)
    const navigate = useNavigate();
    const user = UserPool.getCurrentUser();

    const [ticketData, setTicketData] = useState({
        subject: '',
        reporter: user?.storage.name || '',
        description: '',
        assignee: '',
        userId: user?.username || '',
        timestamp: '',
    });
    const baseUrl = "https://c3lxl5iiuk.execute-api.us-east-1.amazonaws.com/prod"

    const handleChange = (e) => {
        setTicketData({ ...ticketData, [e.target.name]: e.target.value });
    };

    const createTicket = async (ticketData) => {
        try {
            const response = await axios.post(`${baseUrl}/ticket`, ticketData);
            console.log('Ticket created:', response.data)
        } catch (error) {
            console.error('Error creating ticket:', error);
        }
    };

    const saveTicket = async (e) => {
        e.preventDefault();
        await createTicket(ticketData);
    };

    const options = ["Open", "In Progress", "Resolved", "Closed"]
    return (
        <div className='container'>
            <div className='sidebarContainer'>
                <Sidebar />
            </div>
            <div className='pageContent'>
                <Navbar />
                <div className='header'>
                    <h1>Add Ticket</h1>
                </div>
                <form onSubmit={saveTicket}>
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

                    <button className="form-button" type="submit">Create Ticket</button>
                </form>
            </div>
        </div>
    );
}

export default CreateTicket