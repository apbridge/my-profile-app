import { createContext } from 'react';
import {useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    //variable to store the mode state
    const [isLogin, setIsLogin] = useState(localStorage.getItem("isLogin") === "true" ? true : false);
    //function to update the mode state
    const login = () => {
        setIsLogin(true);
        localStorage.setItem("isLogin", "true");
    };
    const logout = () => {
        fetch("https://web.ics.purdue.edu/~apbridge/profile-app/logout.php")
        .then((response) => response.json())
        .then(data => {
            if(data.message) {
                setIsLogin(false);
                localStorage.setItem("isLogin", "false");
            } else {
                console.log(data);
            }
        })
        .catch(error => {
            console.log(error);
        });
    };
    return (
        <AuthContext.Provider value={{ isLogin, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
};  
export default AuthContext;