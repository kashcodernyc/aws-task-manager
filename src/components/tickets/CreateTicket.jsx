import React, { useContext, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AccountContext from '../../Context/AccountContext';

const CreateTicket = () => {
    const context = useContext(AccountContext)
    const { logout } = context;
    const navigate = useNavigate();

    const logoutUser = () => {
        logout().then(data => {
            console.log("User successfully logged out!");
            navigate("/login")
        }).catch(err => {
            console.log(err);
        })
    }
    const [ticketData, setTicketData] = useState({
        subject: '',
        reporter: '',
        description: '',
        assignee: '',
        timestamp: '',
    });
    const baseUrl = "https://c3lxl5iiuk.execute-api.us-east-1.amazonaws.com/prod"

    const handleChange = (e) => {
        setTicketData({ ...ticketData, [e.target.name]: e.target.value });
    };

    const createTicket = async (ticketData) => {
        try {
            const response = await axios.post(`${baseUrl}/ticket`, ticketData);
            console.log('Ticket created:', response.data);
            // Handle the response or perform additional actions
        } catch (error) {
            console.error('Error creating ticket:', error);
        }
    };

    const saveTicket = async (e) => {
        e.preventDefault();
        // Call the createTicket function with the ticketData
        await createTicket(ticketData);
    };


    return (
        <div>
            <h1>Create Ticket</h1>
            <form onSubmit={saveTicket}>
                <label htmlFor="subject">Subject:</label>
                <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={ticketData.subject}
                    onChange={handleChange}
                />

                <label htmlFor="reporter">Reporter:</label>
                <input
                    type="text"
                    id="reporter"
                    name="reporter"
                    value={ticketData.reporter}
                    onChange={handleChange}
                />

                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={ticketData.description}
                    onChange={handleChange}
                ></textarea>

                <label htmlFor="assignee">Assignee:</label>
                <input
                    type="text"
                    id="assignee"
                    name="assignee"
                    value={ticketData.assignee}
                    onChange={handleChange}
                />

                <button type="submit">Create Ticket</button>
                <button type="button" onClick={logoutUser}>Logout</button>
            </form>
        </div>
    )
}

export default CreateTicket