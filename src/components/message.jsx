import React, { useState, useEffect } from 'react';

const Message = ({ type, message, duration = 3000, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            onClose();
        }, duration);

        return () => {
            clearTimeout(timer);
        };
    }, [duration, onClose]);

    const handleCloseClick = () => {
        setIsVisible(false);
        onClose();
    };

    return (
        <div className={`message ${type} ${isVisible ? 'visible' : ''}`}>
            <div className="message-content">{message}</div>
            <button className="message-close" onClick={handleCloseClick}>
                ×
            </button>
        </div>
    );
};

const MessageContainer = ({ messages, onClose }) => {
    return (
        <div className="message-container">
            {messages.map((message, index) => (
                <Message key={index} {...message} onClose={() => onClose(index)} />
            ))}
        </div>
    );
};

const MessageWrapper = () => {
    const [messages, setMessages] = useState([]);

    const addMessage = (type, message, duration) => {
        const newMessage = { type, message, duration };
        setMessages(messages => [...messages, newMessage]);
    };

    const removeMessage = index => {
        setMessages(messages => messages.filter((message, i) => i !== index));
    };

    return (
        <div>
            <button onClick={() => addMessage('success', '操作成功')}>成功消息</button>
            <button onClick={() => addMessage('warning', '操作警告', 5000)}>警告消息</button>
            <button onClick={() => addMessage('error', '操作失败')}>失败消息</button>
            <MessageContainer messages={messages} onClose={removeMessage} />
        </div>
    );
};

export default MessageWrapper;
