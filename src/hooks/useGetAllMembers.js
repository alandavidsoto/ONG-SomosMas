import { useState, useEffect } from "react";
import axios from "axios";

export const useGetAllMembers = () => {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      await axios
        .get("http://ongapi.alkemy.org/api/members")
        .then((res) => setMembers(res.data.data))
        .catch(() => setError(true))
        .finally(() => setLoading(false));
    };
    getData();
  }, []);

  return { members, error, loading };
};
