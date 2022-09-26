import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';




function App() {
  const [ showLogin, setShowLogin ] = useState(false);
  const [ showSignup, setShowSignup ] = useState(false);

  const toggleLogin = () => {
    setShowLogin(showLogin => !showLogin)
  };
  const toggleSignup = () => {
    setShowSignup(showSignup => !showSignup)
  };

  const clickedLoggedin = showLogin ? (
    <LoginForm 
      toggleLogin={toggleLogin}/>)
      : ('');
  
  const clickedSignedup = showSignup ? (
    <SignupForm
    toggleSignup={toggleSignup} />) 
    : ('');   
  
  


  return (
    <div className="App">
      <Header />

      <Hero />

      <section className='button-section'>
        <button onClick={toggleLogin} className='btn login'>LOGGA IN</button>
        <h3>ELLER</h3>
        <button onClick={toggleSignup} className='btn signup'>SIGN ME UP</button>
      </section>

      {clickedLoggedin}
      {clickedSignedup}




    </div>
  )
}

export default App
