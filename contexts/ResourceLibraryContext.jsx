import React, { createContext, useContext, useEffect, useState } from "react";
import { useToastContext } from "./toast";
import api from "@/lib/api";

const ResourceLibraryContext = createContext();

export default function ResourceLibraryProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const { showMessage } = useToastContext();

  const [resources, setResources] = useState([]);
  const fetchResources = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/resource-library/resources");

      if (response.status === 200) {
        setResources(response.data.resources);
      }
    } catch (err) {
      console.log(err);
      showMessage("Unable to fetch resources", "", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const refreshResources = async () => {
    await fetchResources(); // Re-fetch resources
    return true; // Return success status for chaining
  };
  const getSingleProduct = (resource_id) => {
    const resource = resources.find((resource) => resource.id === resource_id);
    console.log(resource);
    return resource;
  };

  useEffect(() => {
    fetchResources();
  }, []);

  return (
    <ResourceLibraryContext.Provider
      value={{ resources, isLoading, getSingleProduct, refreshResources }}
    >
      {children}
    </ResourceLibraryContext.Provider>
  );
}

export const useResourceLibrary = () => useContext(ResourceLibraryContext);
