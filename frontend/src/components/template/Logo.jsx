import './Logo.css'
import React from 'react'
import logo from '../../assets/imgs/logo.png'
import { Link } from 'react-router-dom'

// Defini que o componente é funcional
// eslint-disable-next-line
export default props =>
    <aside className="logo">
        <Link to="/" className="logo">
            <img src={logo} alt="logo" />
        </Link>
    </aside>