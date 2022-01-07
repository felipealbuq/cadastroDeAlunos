import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'
import React from 'react'
//Poderia ser usado o BrowserRouter também ao invés de HashRouter
import {HashRouter} from 'react-router-dom'

import Logo from '../components/template/Logo'
import Nav from '../components/template/Nav'
import Routes  from './Routes'
import Footer from '../components/template/Footer'



// Defini que o componente será funcional
// eslint-disable-next-line
export default props =>
    <HashRouter>
        <div className="app">
            <Logo></Logo>
            <Nav></Nav>
            <Routes></Routes>
            <Footer></Footer>
    </div>
    </HashRouter>

