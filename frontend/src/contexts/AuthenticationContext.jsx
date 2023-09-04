import { createContext, useMemo, useState } from "react";

export const AuthenticationContext = createContext({
  phoneNumber: null,
  authenticate: () => {},
});

const PHONE_NUMBER_NAME = "phone_number";

export function useAuth() {
  const [phoneNumber, setPhoneNumber] = useState(
    localStorage.getItem(PHONE_NUMBER_NAME)
  );

  const authenticate = (phoneNum) => {
    setPhoneNumber(phoneNum);
    localStorage.setItem(PHONE_NUMBER_NAME, phoneNum);
  };

  const isAuthenticated = useMemo(() => {
    return phoneNumber !== null && phoneNumber !== undefined;
  }, [phoneNumber]);

  return {
    phoneNumber,
    isAuthenticated,
    authenticate,
  };
}

export function AuthenticationProvider({ children }) {
  const auth = useAuth();

  return (
    <AuthenticationContext.Provider value={auth}>
      {children}
    </AuthenticationContext.Provider>
  );
}
