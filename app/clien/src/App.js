import React, {useState} from 'react';
import axios from "axios"
import './App.css';
axios.defaults.withCredentials = true;

function App() {
  const [creds, setCreds] = useState({
    username: "",
    password: ""
  })
  const [jokes, setJokes] = useState([])

  const handleChange = e => {
    setCreds({...creds, [e.target.name]: e.target.value})
  }

  const handleRegister = e => {
    e.preventDefault()
    axios
      .post('http://localhost:3300/api/auth/register', creds)
      .then(res => alert('registration successful'))
      .catch(err => alert('registration unsuccessful'))
  }

  const handleLogin = e => {
    e.preventDefault()
    axios
      .post('http://localhost:3300/api/auth/login', creds)
      .then(res => alert('login successful'))
      .catch(err => alert('login unsuccessful'))
  }

  const handleLogout = e => {
    e.preventDefault()
    axios
      .get('http://localhost:3300/api/auth/logout')
      .then(res => alert('logout successful'))
  }

  const getJokes = () => {
    axios
      .get('http://localhost:3300/api/jokes')
      .then(res => setJokes(res.data))
      .catch(err => console.log(err))
  }

  return (
    <div className="App">
      <form onSubmit={handleRegister}>
        <input name="username" value={creds.username} onChange={handleChange}/>
        <input name="password" value={creds.password} onChange={handleChange}/>
        <button>Register</button>
        <button onClick={handleLogin} type="button">Log in</button>
        <button onClick={handleLogout} type="button">Log out</button>
      </form>
      <button type="button" onClick={() => getJokes()}>Get Jokes</button>
      {jokes.length && jokes.map(joke => <p>{joke.joke}</p>)}
    </div>
  );
}

export default App;
