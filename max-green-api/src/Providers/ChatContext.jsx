import { createContext, useEffect, useRef, useState } from 'react';
import notification from '../Service/NotificationStore';
import { listenNotifications } from '../Service/ListenerNotification';

export const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
    const [currChat, setCurrChat] = useState([]);

    useEffect(()=>{
        listenNotifications();
    },[])

    return (
        <ChatContext.Provider
            value={{
                currChat,
                setCurrChat,
                notification
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};