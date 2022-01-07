import React from 'react'
import { Link } from 'react-router-dom'
// Refatorei para referenciar cada item de navegação em Nav.jsx
// eslint-disable-next-line
export default props =>
    <Link to ={`${props.href}`}>
        <i className={`fa fa-${props.icon}`}></i> {props.title}
    </Link>
