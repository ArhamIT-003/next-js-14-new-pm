"use client";

import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export const GetUserDetails = () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/user/me");
      setData(res.data.data);
      // console.log(res.data.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // Mutate function to refresh data
  const mutate = () => {
    fetchUser();
  };

  return { data, loading, error, mutate };
};

export function GetAllUser() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAllUser = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/user/getAllUser");
      setData(res.data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllUser();
  }, [fetchAllUser]);

  // Mutate function to refresh data
  const mutate = () => {
    fetchAllUser();
  };

  return { data, loading, error, mutate };
}

export function GetUser(id) {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/user/${id}`);
      setLoading(false);
      setData(data.data);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      console.log(err);
    }
  }, [id]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { data, loading, error };
}
