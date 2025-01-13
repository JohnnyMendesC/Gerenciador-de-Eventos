import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      }
    };
    loadToken();
  }, []);

  const login = async (newToken, rememberMe) => {
    setToken(newToken);
    if (rememberMe) {
      await AsyncStorage.setItem('token', newToken);
    } else {
      await AsyncStorage.setItem('token', newToken);
    }
  };

  const logout = async () => {
    setToken("");
    await AsyncStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;