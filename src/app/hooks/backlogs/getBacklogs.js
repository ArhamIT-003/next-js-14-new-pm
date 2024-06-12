"use client";

import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export function GetAllBacklogs() {
  const [backlogs, setBacklogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllBacklogs = useCallback(async () => {
    setLoading(true);
    try {
      setLoading(false);
      const res = await axios.get("/api/backlogs/allBacklogs");
      console.log(res.data.data);
      setBacklogs(res.data.data);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    fetchAllBacklogs();
  }, [fetchAllBacklogs]);

  // Mutate function to refresh data
  const mutate = () => {
    fetchAllBacklogs();
  };

  return { backlogs, loading, error, setBacklogs, mutate };
}

export function GetSingleBacklogs(id) {
  const [backlog, setBacklog] = useState([]);
  const [loading, setLoading] = useState(true); // Start with loading: true
  const [error, setError] = useState(null); // Initialize error as null

  useEffect(() => {
    const fetchSingleBacklog = async () => {
      try {
        const res = await axios.get(`/api/backlogs/${id}`);
        console.log(res.data.data);
        setBacklog(res.data.data);
      } catch (error) {
        console.error(error.message);
        setError(error.message);
      } finally {
        setLoading(false); // Set loading to false regardless of success/error
      }
    };

    fetchSingleBacklog();
  }, [id]);

  return { backlog, loading, error };
}
