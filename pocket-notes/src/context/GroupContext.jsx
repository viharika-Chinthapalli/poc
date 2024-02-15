import React, { createContext, useContext, useState, useEffect } from "react";

const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
  const [groupData, setGroupData] = useState([]);

  const fetchData = async () => {
    try {
      const storedGroups =
        (await JSON.parse(localStorage.getItem("groups"))) || {};
      setGroupData(storedGroups);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateGroupData = (newData) => {
    setGroupData(newData);
  };

  return (
    <GroupContext.Provider value={{ groupData, updateGroupData }}>
      {children}
    </GroupContext.Provider>
  );
};

export const useGroupContext = () => {
  return useContext(GroupContext);
};
