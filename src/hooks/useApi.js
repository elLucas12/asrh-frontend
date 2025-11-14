import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApi(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  if (url === undefined) {
    url = process.env.API_URL;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(url);
        setData(res.data);
        setLoading(false);
      } catch (error) {
        setError('Erro ao atingir dados na API');
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, setData, loading, error };
}
