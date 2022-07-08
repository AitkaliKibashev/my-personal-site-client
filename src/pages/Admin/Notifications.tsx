import React, {useEffect} from 'react';
import {PostNotification} from "../../models/Post";
import {useAppDispatch} from "../../hooks/redux";
import {deleteNotification, readNotifications} from "../../store/reducers/actionCreators";
import {APIUrl} from "../../api/API";

interface NotificationsProps {
    notifications: PostNotification[]
}

const Notification: React.FC<{notification: PostNotification}> = ({notification}) => {

    const dispatch = useAppDispatch()

    const closeBtnHandler = (event: any) => {
        if(notification.id) {
            dispatch(deleteNotification(notification.id))
        }
    }

    return (
        <div
            className="notification-wrapper"
        >
            <div className="notification__post-image">
                <img src={notification.image ? `${APIUrl + notification.image}`: 'https://cdnb.artstation.com/p/assets/images/images/018/262/883/large/lucas-gomes-paisagem03.jpg?1558740462'} alt="notification"/>
            </div>
            <a href={'/post/' + notification.post} className={"notification__inner"} dangerouslySetInnerHTML={{__html: notification.message}}>

            </a>
            <span className="notification__close" onClick={closeBtnHandler}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 6L18 18" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </span>
        </div>
    )
}

const Notifications: React.FC<NotificationsProps> = ({notifications}) => {
    const unreadNotifications = notifications.filter(notification => notification.is_read === false)
    const redNotifications = notifications.filter(notification => notification.is_read === true)
    const dispatch = useAppDispatch()

    useEffect(() => {
        return () => {
            if(unreadNotifications.length) {
                unreadNotifications.forEach(notification => {
                    if(notification.id) {
                        dispatch(readNotifications({is_read: true}, notification.id))
                    }
                })
            }
        }
    }, [dispatch, unreadNotifications])

    return (
        <div className="notifications-block">
            {unreadNotifications.length ? <h2>Не прочитанные уведомления</h2> : null}
            {
                unreadNotifications.map(notification =>
                    <Notification key={notification.id} notification={notification} />
                )
            }
            <h2>Прочитанные уведомления</h2>
            {redNotifications.map(notification =>
                <Notification key={notification.id} notification={notification} />
            )}
        </div>
    );
};

export default Notifications;