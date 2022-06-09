import React, { FC } from 'react';
import s from './Header.module.css'

const Header:FC = () => {
  return (
    <header className={s.header}>
      <h1 className={s.h1}>App</h1>
      <a href="https://webbomj.github.io" className={s.button}>GitHub</a>
    </header>
  );
};

export default Header;