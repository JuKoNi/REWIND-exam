import React from 'react'

type Props = {}

const Hero = (props: Props) => {
  return (
    <article className='hero'>
        <h2 className='hero-text'>Se alla dina spelresultat på en och samma sida!</h2>
        <h2 className='hero-text'>OCH:</h2>
        <ul className='hero-list'>
            <li>Se dina vänners resultat</li>
            <li>Lägg till nya matcher</li>
            <li>Redigera gamla matcher</li>
            <li>Se statistik på resultat</li>
        </ul>
    </article>
  )
}

export default Hero