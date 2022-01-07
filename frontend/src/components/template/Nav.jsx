import './Nav.css'
import React from 'react'
import NavItem from './NavItem'

// Defini que o componente é funcional
// eslint-disable-next-line
export default props =>
    <aside className ="menu-area">
        <nav className="menu">
           <NavItem href="/" icon="home" title="Iníco"></NavItem>
            
            <NavItem href="/users" icon="users" title="Alunos"></NavItem>
        </nav>
    </aside>