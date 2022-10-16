import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../models/constant';

type Props = {
    toggleLogin: () => void,

}

const LoginForm = (props: Props) => {
    const [loginUsername, setLoginUsername] = useState<string>('');
    const [loginPassword, setLoginPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();


    // useEffect(() => {
    //   setLoading(true);
    //   setTimeout(() => {
    //     setLoading(false);
    //   }, 2000);
    // }, []);

    function titleCase(str:string){
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    async function login() {
      setLoading(true)
        const account:object = {
          username: titleCase(loginUsername),
          password: loginPassword
        };
        
        let endpoint = '/login';
        const response = await fetch(API_URL + endpoint, {
          method: 'POST',
          body: JSON.stringify(account),
          headers: {'Content-Type': 'application/json'}
        });
        const data = await response.json();

        if (data.success) {
          localStorage.setItem('user', titleCase(data.user));
          navigate('/signedin');
          setLoading(false)
        }
        if (!data.success) {
          alert('Var det verkligen rätt lösenord? Prova igen.')
          setLoading(false)
        }

      };

  return (
    <div className='container'>

      {loading ? ( 
      <div className='loader-container'>
        <div className='spinner'></div>
      </div>) : (
        <section id='loginForm' className='login overlay'>
        <h2>Logga in</h2>
        <h1 onClick={props.toggleLogin} className='close'>X</h1>
        <div>
          <label htmlFor="login-username">Användarnamn</label>
          <input onChange={(e) => setLoginUsername(e.target.value)} id='login-username' type="text" placeholder='Ange användarnamn' required/>
        </div>
        <div>
          <label htmlFor="login-password">Lösenord</label>
          <input onChange={(e) => setLoginPassword(e.target.value)} type="password" id="login-password" placeholder='Ange lösenord' required/>
        </div>
        <button onClick={login} className="btn login">LOG IN</button>
      </section>
      )}



    </div>

  )
}

export default LoginForm