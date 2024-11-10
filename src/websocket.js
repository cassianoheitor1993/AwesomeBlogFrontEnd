// blognews-frontend/src/websocket.js
import { store } from './redux/store';
import { deleteArticle, addNewArticle  } from './redux/articleSlice';

let socket;

function connectWebSocket() {
    const socket = new WebSocket('ws://192.168.0.166:8081/ws/notifications/');

    socket.onopen = function(e) {
        console.log("[open] Connection established");
    };

    socket.onmessage = function(event) {
        try {
            const data = JSON.parse(event.data);
            if (data.message === 'Article deleted') {
                store.dispatch(deleteArticle(data.article_id));
            } else if (data.message === 'New article') {
                store.dispatch(addNewArticle(data.article_data));
            }
        } catch (error) {
            console.error('Error processing WebSocket message:', error);
        }   
    };

    socket.onclose = function(event) {
        console.error('WebSocket closed unexpectedly');
        // Reconnect after a delay
        setTimeout(function() {
            connectWebSocket();
        }, 5000);
    };

    socket.onerror = function(error) {
        console.log(`[error] ${error.message}`);
    };
}

// Call the function to establish the WebSocket connection
connectWebSocket();

export default socket;
