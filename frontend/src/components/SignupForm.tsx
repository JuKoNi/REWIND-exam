import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
    toggleSignup: () => void
}

const SignupForm = (props: Props) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const navigate = useNavigate();

    // function closeSignupForm() {
    //     document.getElementById("signupForm").style.display = "none";
    //   }
    

    async function signup() {

      function titleCase(str:string){
        return str.charAt(0).toUpperCase() + str.slice(1);
      }

        const account:object = {
          username: titleCase(username),
          password: password
        };

        const response = await fetch('http://localhost:8080/signup', {
          method: 'POST',
          body: JSON.stringify(account),
          headers: {'Content-Type': 'application/json'}
        });
        const data = await response.json();
        console.log(data);
        if (data.success) {
          localStorage.setItem('user', titleCase(username));
          navigate('/signedin');
        }
      };
    
  return (
    <section id='signupForm' className='signup overlay'>
        <h2>Sign up</h2>
        <h1 onClick={props.toggleSignup} className='close'>X</h1>
        <div>
        <label htmlFor="username">Användarnamn</label>
        <input onChange={(e) => setUsername(e.target.value)} id='username' type="text" placeholder='Ange användarnamn' />
        </div>
        <div>
        <label htmlFor="password">Lösenord</label>
        <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" placeholder='Ange lösenord' />
        </div>
        <button onClick={signup} className="btn signup">SIGN ME UP</button>
  </section>
  )
}

export default SignupForm