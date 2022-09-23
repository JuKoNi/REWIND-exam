import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
    toggleLogin: () => void,
}

const LoginForm = (props: Props) => {
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const navigate = useNavigate();

    // function closeLoginForm() {
    //     document.getElementById("loginForm").style.display = "none";
    //   };

    async function login() {

        const account:object = {
          username: loginUsername,
          password: loginPassword
        };
        
        const response = await fetch('http://localhost:8080/login', {
          method: 'POST',
          body: JSON.stringify(account),
          headers: {'Content-Type': 'application/json'}
        });
        const data = await response.json();
        console.log(data);
        if (data.success) {
          localStorage.setItem('user', data.user);
          localStorage.setItem('interests', JSON.stringify(data.interests));
          navigate('/signedin');
        }
      };

  return (

    <section id='loginForm' className='login overlay'>
    <h2>Logga in</h2>
    <h1 onClick={props.toggleLogin} className='close'>X</h1>
    <div>
      <label htmlFor="login-username">Användarnamn</label>
      <input onChange={(e) => setLoginUsername(e.target.value)} id='login-username' type="text" placeholder='Ange användarnamn' />
    </div>
    <div>
      <label htmlFor="login-password">Lösenord</label>
      <input onChange={(e) => setLoginPassword(e.target.value)} type="password" id="login-password" placeholder='Ange lösenord' />
    </div>
    <button onClick={login} className="btn login">LOG IN</button>
  </section>
  )
}

export default LoginForm