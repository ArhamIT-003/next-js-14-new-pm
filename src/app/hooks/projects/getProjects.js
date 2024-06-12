"use client";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export default function GetAllProjectDetails() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchAllProjectDetails = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/project/getAllProject");
      setData(res.data.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllProjectDetails();
  }, [fetchAllProjectDetails]);

  // Mutate function to refresh data
  const mutate = () => {
    fetchAllProjectDetails();
  };

  return { data, loading, error, mutate };
}

export function GetProject(id) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/project/${id}`);
        console.log(res.data.data);
        setData(res.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.log(error.message);
      }
    };

    fetchProject();
  }, [id]);

  return { data, loading, error };
}
