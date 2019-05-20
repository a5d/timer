import React, {Component} from 'react'
import config from '../../config'

class Login extends Component {
  state = {
    name: '',
    password: '',
    logged: 0,
    loading: 0
  }

  componentDidMount() {
    this.setState({loading: 1})
    fetch(`${config.serverPath}?action=check_auth`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        this.setState({logged: data, loading: 0})
      })
      .catch(e => {
        console.error(e)
        this.setState({loading: 0})
      })
  }

  sendForm = (e) => {
    e.preventDefault()
    console.log('send', this.state)

    fetch(`${config.serverPath}?action=login`, {
      method: 'POST',
      body: JSON.stringify({name: this.state.name, password: this.state.password})
    })
      .then(res => res.json())
      .then(data => console.log('login', data))
  }

  updateInput = (e) => {
    this.setState({[e.currentTarget.name]: e.currentTarget.value})
  }

  render() {
    if (this.state.loading) return <div>Loading...</div>

    return <div>
      <h2>Login form</h2>
      {(!this.state.logged) ? <form onSubmit={this.sendForm}>
        <p><input name="name" onChange={this.updateInput} value={this.state.name} placeholder="login" type="text"/></p>
        <p><input  name="password" onChange={this.updateInput} value={this.state.password} placeholder="password" type="text"/></p>
        <p><input value="Send" type="submit"/></p>
      </form> : <div>
        <p>Logged</p>
        <p><button>Logout</button></p>
      </div>}
    </div>
  }
}

export default Login