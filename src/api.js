// Temporáriamente em uso até construção de objeto específico

import axios from "axios";

export const BASE_URL = process.env.API_URL;

export async function postFuncionario(jsonData, data, setData) {
  try {
    const res = await axios.post(`${BASE_URL}/funcionarios/registrar`, jsonData);
    const newData = {...res.data, id: (data.length ? data[data.length-1].id + 1 : 1)};
    setData([...data, newData]);
  } catch (error) {
    console.error("Erro ao realizar requisição POST ", error);
  }
}

export function deleteFuncionario(funcionarioId, data, setData, setDeleteDialog) {
  try {
    axios.delete(`${BASE_URL}/funcionarios/${funcionarioId}`).then(() => {
      if (setDeleteDialog !== null)
        setDeleteDialog(true);
      setData(data.filter((reg) => reg.id !== funcionarioId));
    });
  } catch (error) {
    console.error("Erro ao realizar requisição DELETE", error);
  }
}

export async function putFuncionario(funcionarioId, jsonData, data, setData) {
  try {
    const res = await axios.put(`${BASE_URL}/funcionarios/${funcionarioId}`, jsonData);
    const newData = data.map(funcionario => (res.data.id === funcionario.id ? res.data.id : funcionario));
    setData([...data, newData]);
  } catch (error) {
    console.error("Erro ao realizar requisição PUT de atualização ", error);
  }
}
