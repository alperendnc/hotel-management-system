import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);

function getStoredUser() {
  const localUser = localStorage.getItem("hotelUser");
  const sessionUser = sessionStorage.getItem("hotelUser");
  const storedUser = localUser || sessionUser;

  if (!storedUser) {
    return null;
  }

  try {
    const parsedUser = JSON.parse(storedUser);

    if (!parsedUser?.isLoggedIn) {
      return null;
    }

    return parsedUser;
  } catch {
    localStorage.removeItem("hotelUser");
    sessionStorage.removeItem("hotelUser");

    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setUser(getStoredUser());
    setIsLoading(false);
  }, []);

  const login = (hotel, rememberMe = false) => {
    const loggedInUser = {
      hotelId: hotel.hotelId,
      hotelName: hotel.hotelName,
      ownerName: hotel.ownerName,
      email: hotel.email,
      phone: hotel.phone,
      city: hotel.city,
      roomCount: hotel.roomCount,
      logo: hotel.logo || "",
      role: hotel.role || "admin",
      isLoggedIn: true,
    };

    localStorage.removeItem("hotelUser");
    sessionStorage.removeItem("hotelUser");

    if (rememberMe) {
      localStorage.setItem(
        "hotelUser",
        JSON.stringify(loggedInUser),
      );
    } else {
      sessionStorage.setItem(
        "hotelUser",
        JSON.stringify(loggedInUser),
      );
    }

    setUser(loggedInUser);

    return loggedInUser;
  };

  const logout = () => {
    localStorage.removeItem("hotelUser");
    sessionStorage.removeItem("hotelUser");

    setUser(null);
  };

  const updateUser = (updatedValues) => {
    setUser((currentUser) => {
      if (!currentUser) {
        return null;
      }

      const updatedUser = {
        ...currentUser,
        ...updatedValues,
      };

      if (localStorage.getItem("hotelUser")) {
        localStorage.setItem(
          "hotelUser",
          JSON.stringify(updatedUser),
        );
      }

      if (sessionStorage.getItem("hotelUser")) {
        sessionStorage.setItem(
          "hotelUser",
          JSON.stringify(updatedUser),
        );
      }

      return updatedUser;
    });
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: Boolean(user?.isLoggedIn),
    login,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth, AuthProvider içerisinde kullanılmalıdır.",
    );
  }

  return context;
}