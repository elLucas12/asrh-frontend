import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { BASE_URL, deleteFuncionario, postFuncionario } from "../../api";
import useApi from "../../hooks/useApi";

import {
  CircularProgress,
  Typography,
  Box,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import ListaFuncionariosStyle from './ListaFuncionarios.module.css';

export default function ListaFuncionarios() {
  const navigate = useNavigate();
  const { data, setData, loading, error } = useApi(BASE_URL);

  const [dense, setDense] = useState(false);
  const [addFuncionarioDialog, setAddFuncionarioDialog] = useState(false);
  const [deletedFuncionarioDialog, setDeletedFuncionarioDialog] = useState(false);

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
    return <Typography variante="body1" sx={{color: "red"}}>{error}</Typography>
  }

  return (
    <Box component="div" className={CarsListStyle['lista-funcionarios']}>
      <Box component="div" sx={{margin: "auto", textAlign: "center"}}>
        <Typography gutterBottom variant="h5" component="div">
          Lista de Funcionários
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Funcionário registrados no sistema.
        </Typography>
      </Box>
      <Box component="div" sx={{margin: "auto"}}>
        <List dense={dense}>
          {data.map((funcionario) => {
            return (
              <ListItem
                key={funcionario.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={(e) => {
                      e.preventDefault();
                      /* Requisição DELETE com o ID do funcionário */
                      deleteFuncionario(funcionario.id, data, setData, setDeletedFuncionarioDialog);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
                sx={{
                  display: "flex",
                  mb: "15px"
                }}
              >
                <ListItemButton
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/funcionario/" + funcionario.id);
                  }}
                >
                  <ListItemText
                    primary={funcionario.name + " - " + funcionario.funcao.nome}
                    secondary={
                      <Typography variant="caption">ID: {funcionario.id}</Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <Box component="div" sx={{display: "flex"}}>
          <Button variant="outlined" sx={{margin: "auto"}} onClick={() => {setAddFuncionarioDialog(true);}}>Cadastrar Funcionário</Button>
        </Box>
      </Box>

      {/* Dialogo com formulário, mostrado ao apertar o botão de novo veículo */}
      <Dialog
        open={addFuncionarioDialog}
        onClose={() => {setAddFuncionarioDialog(false);}}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();

            // Armazenando informações do formulário
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());

            // Sincronizando atualizações com a API
            postCar(formJson, data, setData);
            setAddFuncionarioDialog(false);
          },
        }}
      >
        <DialogTitle>Cad. Funcionário</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Para cadastrar um novo funcionário, por favor preencha o formulário.
          </DialogContentText>
          <TextField
            autoFocus={true}
            required={true}
            margin={dense ? "dense" : "normal"}
            id="nome"
            name="nome"
            label="Nome do Funcionário"
            type="text"
            fullWidth={true}
            variant="standard"
            error={(e) => (!e.target.value.includes("@") && e.target.value !== '')}
            helperText={
              (e) => {
                !e.target.value.includes("@") && e.target.value !== ''
                  ? 'E-mail inválido'
                  : 'Digite um e-mail válido'
              }
            }
          />
          <TextField
            required={true}
            margin={dense ? "dense" : "normal"}
            id="cpf"
            name="cpf"
            label="CPF"
            type="text"
            fullWidth={true}
            variant="standard"
            error={(e) => (e.target.value.length > 0 && e.target.value.length !== 14)}
            helperText={
              (e) => {
                e.target.value.length > 0 && e.target.value.length !== 14
                  ? 'CPF inválido'
                  : 'Digite o CPF com pontos e hífen'
              }
            }
            onChange={
              (e) => {
                const value = e.target.value.replace(/\D/g, '');
                const formated = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
                e.target.value = formated;
                /* setFormData({...formData, cpf: formated}); */
              }
            }
          />
          <TextField
            required={true}
            margin={dense ? "dense" : "normal"}
            id="rg"
            name="rg"
            label="RG"
            type="text"
            fullWidth={true}
            variant="standard"
          />
          <TextField
            required={true}
            margin={dense ? "dense" : "normal"}
            id="ctps"
            name="ctps"
            label="CTPS"
            type="text"
            fullWidth={true}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {setAddFuncionarioDialog(false);}}>Cancelar</Button>
          <Button type="submit">Enviar</Button>
        </DialogActions>
      </Dialog>

      {/* Dialogo mostrado ao deletar um funcionário */}
      <Dialog
        open={deletedFuncionarioDialog}
        onClose={() => {setDeletedFuncionarioDialog(false);}}
      >
        <DialogTitle>Deletar Funcionário</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Funcionário deletado com sucesso!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setDeletedFuncionarioDialog(false);
          }}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
