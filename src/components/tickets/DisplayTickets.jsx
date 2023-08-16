import React, { useEffect, useMemo, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import '../style.css';
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';
import { formatDate, CustomCell } from '../../utils/helperFunction';
import { TicketContext } from '../../Context/TicketContext';



const DisplayTickets = () => {
    const { ticketData, setTicketData } = useContext(TicketContext)
    const memoizedTicketData = useMemo(() => ticketData, [ticketData]);

    const navigate = useNavigate();
    const baseUrl = "https://c3lxl5iiuk.execute-api.us-east-1.amazonaws.com/prod";

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get(`${baseUrl}/tickets`);
                const tickets = response.data.tickets;
                setTicketData(tickets);
                console.log('Tickets:', tickets);
            } catch (error) {
                console.error('Error retrieving ticket:', error);
            }
        };

        fetchTickets();
    }, []);



    const columns = [
        { id: 1, field: "subject", headerName: "Subject", width: 200 },
        { id: 2, field: "reporter", headerName: "Reporter", flex: 100 },
        {
            id: 3,
            field: "timestamp",
            headerName: "Date",
            flex: 100,
            hide: "sm",
            valueFormatter: (params) => {
                const date = params.value ? formatDate(params.value) : "";
                return date || "";
            }
        },
        {
            id: 4,
            field: 'status',
            headerName: 'Status',
            flex: 100,
            hide: "sm",
            renderCell: (params) => {
                return <CustomCell value={params.value}>{params.value}</CustomCell>;
            },
        },
        {
            id: 5,
            field: "assignee",
            headerName: "Assignee",
            flex: 100,
            renderCell: (params) => {
                return params.row.assignee || "";
            }
        },
        {
            field: "action",
            headerName: "Action",
            flex: 200,
            renderCell: (params) => {
                return (
                    <div className="actionButtons">
                        <button
                            onClick={() => navigate(`/tickets/${params.row.ticketId}`)}
                            className="form-button"
                        >
                            View
                        </button>
                    </div>
                );
            }
        }

    ]

    return (
        <div className='container'>
            <div className='sidebarContainer'>
                <Sidebar />
            </div>
            <div className='pageContent'>
                <Navbar />
                <div className='header'>
                    <h1>page content</h1>
                    <button className="form-button" onClick={() => navigate(`/tickets/add`)}>Add Ticket</button>
                </div>
                <Box sx={{ height: 400 }}>
                    <DataGrid
                        rows={memoizedTicketData}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        slots={{ toolbar: GridToolbar }}
                        slotProps={{
                            toolbar: {
                                showQuickFilter: true,
                                quickFilterProps: { debounceMs: 500 },
                            }
                        }}
                        pageSizeOptions={[5]}
                        disableRowSelectionOnClick
                        getRowId={row => row.ticketId}
                    />
                </Box>
            </div>
        </div>
    );
};

export default DisplayTickets;
