import { createContext, useContext, useState } from "react";
import Alert from "../components/Alert";

const AlertContext = createContext();

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState(null);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && <Alert {...alert} />}
    </AlertContext.Provider>
  );
}

export const useAlert = () => useContext(AlertContext);
