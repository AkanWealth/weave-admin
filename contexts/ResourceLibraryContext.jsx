import React, { createContext, useContext, useEffect, useState } from "react";
import { useMessageContext } from "./toast";
import api from "@/lib/api";

const ResourceLibraryContext = createContext();

export default function ResourceLibraryProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const { showMessage } = useMessageContext();

  const [resources, setResources] = useState([]);
  const fetchResources = async () => {
    try {
      const response = await api.get("/resource-library/resources");

      if (response.status === 200) {
        setResources(response.data.resources);
      }
    } catch (err) {
      showMessage("Unable to fetch resources", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  return (
    <ResourceLibraryContext.Provider value={{ resources, isLoading }}>
      {children}
    </ResourceLibraryContext.Provider>
  );
}

export const useResourceLibrary = () => useContext(ResourceLibraryContext);
