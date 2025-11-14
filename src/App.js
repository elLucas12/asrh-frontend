import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import { Typography, Container } from '@mui/material';

import Funcionario from './components/Funcionario/Funcionario';
import ListaFuncionarios from './components/ListaFuncionarios/ListaFuncionarios';
import Cadastro from './components/Cadastro/Cadastro';
import NavBar from './components/NavBar/NavBar';
import NotFound from './components/NotFound/NotFound';

export default function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Container className="App">
          <Routes>
            <Route path="/" element={<ListaFuncionarios />} />
            <Route path="/cadastro" element={<Cadastro />}/>
            <Route path="/404" element={<NotFound />} />
            <Route path="/funcionario/:id" element={<Funcionario />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
        <footer className="App-footer">
          <Typography variant="caption">
            &copy; {new Date().getFullYear()} elLucas12 - Feito com ReactJS
          </Typography>
        </footer>
      </div>
    </Router>
  );
}
