import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import AccountContext from '../../Context/AccountContext';
import "../style.css"
import { AiOutlineHome } from 'react-icons/ai';
import { GoTasklist } from 'react-icons/go'
import { MdQueryStats } from 'react-icons/md'
import { PiKanbanLight } from 'react-icons/pi';
import { SiTask } from 'react-icons/si';
import { IoIosLogOut } from 'react-icons/io';

const Sidebar = () => {
    const context = useContext(AccountContext)
    const navigate = useNavigate();
    const { logout } = context;

    const logoutUser = () => {
        logout().then(data => {
            console.log("User successfully logged out!");
            navigate("/login")
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div className="sidebar">
            <div className="top">
                <div className="app-title">
                    <SiTask className="logo" />
                    <p className='app-name'>AWS Task Manger</p>
                </div>
                <ul>
                    <li><span className='icon'><AiOutlineHome /></span><span className='menu'>Home</span></li>
                    <li><span className='icon'><PiKanbanLight /></span><span className='menu'>Kanban</span></li>
                    <li onClick={() => navigate('/tickets/display')}><span className='icon'><GoTasklist /></span><span className='menu'>Tasks</span></li>
                    <li><span className='icon'><MdQueryStats /></span><span className='menu'>Stats</span></li>
                </ul >
            </div>
            <ul>
                <li onClick={logoutUser}><span className='icon'><IoIosLogOut /></span><span className='menu'>Logout</span></li>
            </ul>
        </div >
    )
}

export default Sidebar