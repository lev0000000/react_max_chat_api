import { deleteNotification, getNotification } from "../http/getSettings";
import notification from "../Service/NotificationStore";

export const listenNotifications = async () => {
    console.log("LISTENER START");

    while (true) {
        try {
            const data = await getNotification();

            if (data) {
                notification.notify();
                await deleteNotification(data.receiptId);

            }
        } catch (error) {

            await new Promise(resolve =>
                setTimeout(resolve, 3000)
            );
        }
    }
};
