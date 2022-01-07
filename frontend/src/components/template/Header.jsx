import './Header.css'
import React from 'react'

// Defini que o componente é funcional
// eslint-disable-next-line
export default props =>
    // Para celulares, o header não vai aparecer e se for do tipo sm, vai usar o d-flex
    <header className ="header d-none d-sm-flex flex-column">
        <h1 className="mt-3">
            {/* Usei as classes do font awesome */}
            <i className={`fa fa-${props.icon}`}></i> {props.title}
        </h1>
        <p className="lead text-muted">{props.subtitle}</p>
    </header>