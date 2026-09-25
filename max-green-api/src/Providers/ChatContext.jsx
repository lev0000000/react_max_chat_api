import { createContext, useState } from 'react';

export const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
    const [currChat, setCurrChat] = useState([]);
    

    return (
        <ChatContext.Provider
            value={{
                currChat,
                setCurrChat,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};