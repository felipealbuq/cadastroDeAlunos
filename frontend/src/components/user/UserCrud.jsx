import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

// Poderia ter colocado essa constante também diretamente no jsx
const headerProps = {
    icon: 'users',
    title: 'Alunos',
    subtitle: 'Cadastre aqui os alunos: Inclua, Liste, Altere e Exclua.'
}

const baseUrl = 'http://localhost:3001/users'

// Defini o estado inicial do componente para limpar o form quando usuário clicar em cancelar.
const initialState = {
    user: { name: '', email: '' },
    list: []
}

// Por se tratar de um componente de estado, defini o componente sendo de classe
export default class UserCrud extends Component {

    state = { ...initialState }

    // Essa função será chamada quando o compontente for exibido na tela
    // usei a função componentWillMount
    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    // Essa função limpa o formulário, ou seja, o user
    clear() {
        this.setState({ user: initialState.user })
    }

    // Essa função inclui ou altera o aluno no db.json através de um post(incluir) ou put(alterar)
    save() {

        // Primeiramente é preciso obter o próprio usuário
        const user = this.state.user

        // Se o id estiver setado, significa que o usuário já está incluído 
        const method = user.id ? 'put' : 'post'

        // Essa url varia dependendo do método 'put' ou 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl

        // Pelo fato do axios ser baseado em promise, posteriormente tenho que chamar o then
        axios[method](url, user).then(resp => {

            // Recebendo o aluno que foi obtido através do web service.
            const list = this.getUpdatedList(resp.data)

            // Depois que inseri ou limpei o usuário, é necessário limpar o formulário
            this.setState({ user: initialState.user, list })
        })

    }

    getUpdatedList(user, add = true) {

        // Através do filter, gerei uma lista sem o aluno que não passei como parâmetro
        // e depois adicionei com o unshift
        const list = this.state.list.filter(u => u.id !== user.id)

        //Usei o unshift para adiconar o aluno na primeira posição
        if (add) list.unshift(user)

        // O retorno dessa funçaõ será armazendo em const list da função save()
        return list

    }

    // Essa função limpa os campos de nome e email
    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })

    }

    // Essa função renderiza o formulário
    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>nome</label>
                            <input type="text" className="form-control"
                                name="name" value={this.state.user.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" className="form-control"
                                name="email" value={this.state.user.email}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o e-mail..." />
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            // No clique do botão, chamei a função save()
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            // No clique do botão, chamei a função clear()
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    // Essa função atualiza simplesmente o estado do objeto
    load(user) {
        this.setState({ user })
    }

    remove(user) {
        // Chamei o método http delete para excluir o registro em db.json
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {

            //Atualizei a lista para remover o usuário da lista local através de um filter
            const list = this.getUpdatedList(user, false)
            this.setState({ list })
        })
    }

    // Essa função que vai renderizar a tabela de alunos
    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>

                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    // Essa função que vai renderizar as linhas e vai mapear a lista de alunos que  
    // estão dentro do estado do objeto para jsx
    renderRows() {
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning"
                            // No clique do botão, chamei a função load 
                            onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            // No clique do botão chamei a função remove
                            onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}