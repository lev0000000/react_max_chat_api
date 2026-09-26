import { createContext, useEffect, useState } from 'react';
import NotificationStore from '../store/NotificationStore';
import { listenNotifications } from '../Service/ListenerNotification';

export const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
    const [currChat, setCurrChat] = useState([]);
    
    useEffect(()=>{
        listenNotifications();
    })

    return (
        <ChatContext.Provider
            value={{
                currChat,
                setCurrChat,
                notification: new NotificationStore
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};