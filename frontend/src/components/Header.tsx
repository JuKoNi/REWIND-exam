import React from 'react';
import { useNavigate } from 'react-router-dom'
import Signedin from '../views/Signedin';

type Props = {}

const Header = (props: Props) => {
  const navigate = useNavigate()


  // const logoutBtn = 

  return (
    <header>
        <h1 className='logo'> r.e.WIN.d </h1>

    </header>
  )
}

export default Header