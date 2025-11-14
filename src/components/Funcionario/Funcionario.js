import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useApi from "../../hooks/useApi";
import { BASE_URL, putFuncionario } from "../../api";

import {
  Box,
  CircularProgress,
  TextField,
  Typography,
  Button
} from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';

export default function Funcionario() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, setData, loading, error } = useApi(BASE_URL);
  const [funcionario, setFuncionario] = useState(null);
  const [editMode, setEditMode] = useState(false);

  // Verificações de carregamento dos dados da API
  if (loading) {
    return (
      <CircularProgress
        sx={{
          position: "absolute",
          left: 0, right: 0, top: 0, bottom: 0,
          ml: "auto", mr: "auto", mt: "auto", mb: "auto"
        }}
      />
    );
  } else if (error) {
    return <Typography variante="body1" sx={{ color: "red" }}>{error}</Typography>
  }

  // Seleção do carro conforme ID de parâmetro
  let selectedFuncionario = null;
  if (funcionario === null) {
    selectedFuncionario = data.find((reg) => reg.id === Number(id));
    setFuncionario(selectedFuncionario);
  } else {
    selectedFuncionario = funcionario;
  }

  // Redireciona para página NotFound caso ID não exista
  if (!selectedFuncionario) {
    navigate("/404");
    return <></>;
  }

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column"
    }}>
      <Box component="div" sx={{ margin: "auto", textAlign: "center" }}>
        <Typography gutterBottom variant="h5" component="div">
          Detalhes de Funcionário
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Detalhes do Funcionário Índice "{selectedFuncionario.id}"
        </Typography>
      </Box>
      <Box
        component="form"
        sx={{
          margin: "auto",
        }}
        onSubmit={(e) => {
          e.preventDefault();

          // Armazenando informações do formulário
          const formData = new FormData(e.currentTarget);
          let formJson = Object.fromEntries(formData.entries());

          // Atualizando informações locais e na API
          putFuncionario({ ...formJson, id: Number(formJson.id) }, data, setData);
          setEditMode(false);
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            autoFocus={false}
            required={true}
            margin="normal"
            id="id"
            name="id"
            label="Número de ID"
            type="text"
            fullWidth={false}
            variant="standard"
            defaultValue={selectedFuncionario.id}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
          />
          <TextField
            disabled={!editMode}
            autoFocus={false}
            required={true}
            margin="normal"
            id="nome"
            name="nome"
            label="Nome Funcionário"
            type="text"
            fullWidth={false}
            variant="standard"
            defaultValue={selectedFuncionario.nome}
          />
          <TextField
            disabled={!editMode}
            autoFocus={false}
            required={true}
            margin="normal"
            id="cpf"
            name="cpf"
            label="CPF"
            type="text"
            fullWidth={false}
            variant="standard"
            defaultValue={selectedFuncionario.cpf}
          />
          <TextField
            disabled={!editMode}
            autoFocus={true}
            required={true}
            margin="normal"
            id="rg"
            name="rg"
            label="RG"
            type="text"
            fullWidth={false}
            variant="standard"
            defaultValue={selectedFuncionario.rg}
          />
          <TextField
            disabled={!editMode}
            autoFocus={true}
            required={true}
            margin="normal"
            id="ctps"
            name="ctps"
            label="CTPS"
            type="text"
            fullWidth={false}
            variant="standard"
            defaultValue={selectedFuncionario.ctps}
          />
          <TextField
            disabled={!editMode}
            autofocus={false}
            required={true}
            defaultValue={selectedFuncionario.email}
            margin={dense ? "dense" : "normal"}
            id="email"
            name="email"
            label="E-Mail"
            type="email"
            fullWidth={true}
            variant="standard"
          />
          <TextField
            disabled={!editMode}
            defaultValue={selectedFuncionario.endereco}
            required={true}
            autofocus={false}
            margin={dense ? "dense" : "normal"}
            id="endereco"
            name="endereco"
            label="Endereço"
            type="text"
            fullWidth={true}
            variant="standard"
          />
          <TextField
            disabled={!editMode}
            defaultValue={selectedFuncionario.telefone}
            required={true}
            margin={dense ? "dense" : "normal"}
            id="telefone"
            name="telefone"
            label="Telefone Celular"
            type="tel"
            fullWidth={true}
            variant="standard"
          />
          <TextField
            disabled={!editMode}
            defaultValue={selectedFuncionario.funcao.nome}
            required={true}
            margin={dense ? "dense" : "normal"}
            id="funcao"
            name="funcao"
            label="Função"
            type="text"
            fullWidth={true}
            variant="standard"
          />
          <TextField
            disabled={!editMode}
            defaultValue={selectedFuncionario.dataAdmissao}
            required={true}
            margin={dense ? "dense" : "normal"}
            id="dataAdmissao"
            name="dataAdmissao"
            label="Data de Admissão"
            type="date"
            fullWidth={true}
            variant="standard"
          />
          <TextField
            disabled={!editMode}
            defaultValue={selectedFuncionario.dataDemissao}
            required={false}
            margin={dense ? "dense" : "normal"}
            id="dataDemissao"
            name="dataDemissao"
            label="Data de Demissão"
            type="date"
            fullWidth={true}
            variant="standard"
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="outlined"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
            sx={{ mr: 1 }}
          >
            Voltar
          </Button>
          {
            editMode ?
              <>
                <Button variant="outlined"
                  onClick={(e) => {
                    e.preventDefault();
                    setEditMode(!editMode);
                  }}
                  sx={{ mr: 0.25 }}
                >Cancelar</Button>
                <Button variant="contained" endIcon={<EditIcon />} type="submit">Salvar</Button>
              </> :
              <Button variant="outlined" endIcon={<EditIcon />}
                onClick={(e) => {
                  e.preventDefault();
                  setEditMode(!editMode);
                }}
              >Editar Dados</Button>
          }
        </Box>
      </Box>
    </Box>
  );
}
