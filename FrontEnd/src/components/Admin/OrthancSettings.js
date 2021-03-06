import React, { Component, Fragment } from 'react'
import apis from '../../services/apis';

export default class OrthancSettings extends Component {

    /** Init State */
    state = {
        OrthancAddress : '',
        OrthancPort : 0,
        OrthancUsername : '',
        OrthancPassword : ''
    }
    
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.testConnexion = this.testConnexion.bind(this)
    }

    /**
     * Fetch value from BackEnd
     */
    async componentDidMount(){
        let answer = await apis.options.getOrthancServer()
        this.setState(answer)
    }

    /**
     * Store form values in state
     * @param {*} event 
     */
    handleChange(event) {
        const target = event.target
        const name = target.name
        const value = target.type === 'checkbox' ? target.checked : target.value
        
        this.setState({
            [name]: value
        })

    }

    /**
     * Send new value to BackEnd
     */
    async handleClick() {
        apis.options.setOrthancServer(this.state.OrthancAddress, this.state.OrthancPort, 
            this.state.OrthancUsername, this.state.OrthancPassword)
    }

    /**
     * Try to connect to Orthanc System API, response is shown in an toastify
     */
    testConnexion () {
        apis.options.getOrthancSystem()
    }

    render() {
        return (
            <Fragment>
                <div className="form-group">
                    <h2 className="card-title">Orthanc Server</h2>
                    <label htmlFor="address">Address : </label>
                    <input type='text' name="OrthancAddress" className="row form-control" onChange={this.handleChange} value={this.state.OrthancAddress} placeholder="http://" />
                    <label htmlFor="port">Port : </label>
                    <input type='number' min="0" max="999999" name="OrthancPort" className="row form-control" value={this.state.OrthancPort} onChange={this.handleChange} />
                    <label htmlFor="username">Username : </label>
                    <input type='text' name="OrthancUsername" className="row form-control" value={this.state.OrthancUsername} onChange={this.handleChange} />
                    <label htmlFor="password">Password : </label>
                    <input type='password' name="OrthancPassword" className="row form-control" value={this.state.OrthancPassword} onChange={this.handleChange} />
                </div>
                <div className="form-group text-right">
                    <input type='button' className='btn btn-primary' onClick={this.handleClick} value='Update' />
                    <input type='button' className='btn btn-info' onClick={this.testConnexion} value='Check Connexion' />
                </div>
            </Fragment>
        )
    }
}
