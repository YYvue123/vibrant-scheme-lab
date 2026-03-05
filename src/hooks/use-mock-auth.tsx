import { createContext, useContext, useState, ReactNode } from "react";

export interface MockUser {
  name: string;
  avatar?: string;
  subscriptionQuota: number;
  subscriptionQuotaMax: number;
  extraQuota: number;
  remainingTime: string;
}

interface MockAuthContextType {
  isLoggedIn: boolean;
  user: MockUser | null;
  login: () => void;
  logout: () => void;
}

const mockUserData: MockUser = {
  name: "用户",
  subscriptionQuota: 1129,
  subscriptionQuotaMax: 1200,
  extraQuota: 828,
  remainingTime: "29d 0h 55m",
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
