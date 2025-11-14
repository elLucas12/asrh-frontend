import React, { useState } from "react";
import useApi from "../../hooks/useApi";
import { BASE_URL, postFuncionario } from "../../api";

import {
  Box,
  Typography,
  CircularProgress,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';

export default function Cadastro() {
  const { data, setData, loading, error } = useApi(BASE_URL);
  const [addFuncionarioDialog, setAddFuncionarioDialog] = useState(false);

  // Verificações de carregamento dos dados da API
  if (loading) {
    return(
      <CircularProgress
        sx={{
          position: "absolute",
          left: 0, right: 0, top: 0, bottom: 0,
          ml: "auto", mr: "auto", mt: "auto", mb: "auto"
        }}
      />
    );
  } else if (error) {
    return <Typography variante="body1" sx={{color: "red"}}>{error}</Typography>
  }

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column"
    }}>
      <Box component="div" sx={{margin: "auto", textAlign: "center"}}>
        <Typography gutterBottom variant="h5" component="div">
          Cadastrar Funcionário
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Preencha o formulário para cadastrar funcionários
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
          postFuncionario(formJson, data, setData);
          setAddFuncionarioDialog(true);
          e.currentTarget.reset();
        }}
      >
        <Box sx={{display: "flex", flexDirection: "column"}}>
          <TextField
            autoFocus={true}
            required={true}
            margin="normal"
            id="nome"
            name="nome"
            label="Nome Funcionário"
            type="text"
            fullWidth={false}
            variant="standard"
          />
          <TextField
            required={true}
            margin="normal"
            id="cpf"
            name="cpf"
            label="CPF"
            type="text"
            fullWidth={false}
            variant="standard"
          />
          <TextField
            required={true}
            margin="normal"
            id="rg"
            name="rg"
            label="RG"
            type="text"
            fullWidth={false}
            variant="standard"
          />
          <TextField
            autoFocus={false}
            required={true}
            margin="normal"
            id="ctps"
            name="ctps"
            label="CTPS"
            type="text"
            fullWidth={false}
            variant="standard"
          />
          <TextField
            required={true}
            margin={dense ? "dense" : "normal"}
            id="email"
            name="email"
            label="E-Mail"
            type="email"
            fullWidth={true}
            variant="standard"
          />
          <TextField
            required={true}
            margin={dense ? "dense" : "normal"}
            id="endereco"
            name="endereco"
            label="Endereço"
            type="text"
            fullWidth={true}
            variant="standard"
          />
          <TextField
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
        <Box sx={{display: "flex", justifyContent: "center"}}>
          <Button variant="contained" endIcon={<EditIcon />} type="submit">Cadastrar</Button>
        </Box>
      </Box>

      {/* Dialogo mostrado ao adicionar o funcionário */}
      <Dialog
        open={addFuncionarioDialog}
        onClose={() => {setAddFuncionarioDialog(false);}}
      >
        <DialogTitle>Cadastro Concluído</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Novo funcionário cadastrado com sucesso!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setAddFuncionarioDialog(false);
          }}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
