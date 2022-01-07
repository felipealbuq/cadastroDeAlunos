import './Main.css'
import React from 'react'
import Header from './Header'

// Defini que o componente é funcional pois não terá estado.
// eslint-disable-next-line
export default props => 
    
// Para poder retornar mais de um elemento sem problema, usei o React.fragment

    <React.Fragment>
        <Header{...props}/>
        <main className="content container-fluid">
            <div className="p-3 mt-3">
                {props.children}
            </div>
        </main>
       
    </React.Fragment>
