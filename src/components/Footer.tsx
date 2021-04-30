import React from 'react'
import styles from '../styles/Home.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      Traduction par{' '}
      <a
        href='https://fr.wikipedia.org/wiki/Jean-Marie_Guyau'
        target='_blank'
        rel='noopener noreferrer'
      >
        Jean-Marie Guyau
      </a>
      , extraite de{' '}
      <a
        href='https://fr.wikisource.org/wiki/Manuel_d%E2%80%99%C3%89pict%C3%A8te_(trad._Guyau)/Manuel'
        target='_blank'
        rel='noopener noreferrer'
      >
        Wikisource
      </a>
    </footer>
  )
}

export default Footer
