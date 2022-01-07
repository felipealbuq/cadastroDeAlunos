import React from 'react'
import{Switch,Route,Redirect} from 'react-router'

import Home from '../components/home/Home'
import UserCrud from '../components/user/UserCrud'

// Defini que o componente será um componente funcional, pra fazer o mapeamento das rotas
// entre a url e os componentes
// eslint-disable-next-line 
export default props =>
    <Switch>
    {/* Sempre que o usuário navegar para o '/', ele vai renderizar o componten Home. */}
        <Route exact path='/' component={Home}></Route> 
    
    {/* Sempre que o usuário navegar para o '/users', ele vai renderizar o componente UserCrud*/}
        <Route path='/users' component={UserCrud}></Route>
    
    {/*Caso nenhuma url diferente tenha sido mapeada, ele irá renderizar o componente Home  */}
        <Redirect from ='*' to='/'></Redirect>
    </Switch>
