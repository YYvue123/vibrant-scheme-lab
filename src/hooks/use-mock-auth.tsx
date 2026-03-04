import { createContext, useContext, useState, ReactNode } from "react";

export interface MockUser {
  name: string;
  avatar?: string;
  subscriptionQuota: number;
  subscriptionQuotaMax: number;
  extraQuota: number;
}

interface MockAuthContextType {
  isLoggedIn: boolean;
  user: MockUser | null;
  login: () => void;
  logout: () => void;
}

const mockUserData: MockUser = {
  name: "用户",
  subscriptionQuota: 10,
  subscriptionQuotaMax: 10,
  extraQuota: 828,
};

const MockAuthContext = createContext<MockAuthContextType>({
  isLoggedIn: true,
  user: mockUserData,
  login: () => {},
  logout: () => {},
});

export function MockAuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <MockAuthContext.Provider
      value={{
        isLoggedIn,
        user: isLoggedIn ? mockUserData : null,
        login: () => setIsLoggedIn(true),
        logout: () => setIsLoggedIn(false),
      }}
    >
      {children}
    </MockAuthContext.Provider>
  );
}

export function useMockAuth() {
  return useContext(MockAuthContext);
}
