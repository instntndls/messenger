import { AppConfig } from "@/config";

const TYPES = {
  ERROR: 0,
  MESSAGE_CREATED: 1,
  MESSAGE_CHANGED: 2,
  MESSAGE_DELETED: 3,
  USER_START_WRITING: 100,
  USER_STOP_WRITING: 101
};

let socket;

export function initSocket(token, userId) {
  socket = new WebSocket(AppConfig.websocketURL);

  socket.onopen = () => {
    socket.send(JSON.stringify({ token, userId }));
    console.log('WebSocket connection established');
  };

  socket.onclose = () => {
    console.log('Connection closed');
  };

  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
}

export function closeSocket() {
  if (socket) {
    socket.close();
    socket = null;
  }
}

function onMessage(type, callback) {
  socket.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);
    if (data.type === type) {
      callback(data);
    }
  });
}

function sendMessage(type, payload) {
  socket.send(JSON.stringify({ type, ...payload }));
}

export function onMessageCreated(callback) {
  onMessage(TYPES.MESSAGE_CREATED, callback);
}

export function onMessageUpdated(callback) {
  onMessage(TYPES.MESSAGE_CHANGED, callback);
}

export function onMessageDeleted(callback) {
  onMessage(TYPES.MESSAGE_DELETED, callback);
}

export function onUserWriting(callback) {
  onMessage(TYPES.USER_START_WRITING, callback);
}

export function onUserWrote(callback) {
  onMessage(TYPES.USER_STOP_WRITING, callback);
}

export function notifyMessageCreated(userId, chatId, messageId) {
  sendMessage(TYPES.MESSAGE_CREATED, { user_id: userId, chat_id: chatId, message_id: messageId });
}

export function notifyMessageChanged(userId, chatId, messageId) {
  sendMessage(TYPES.MESSAGE_CHANGED, { user_id: userId, chat_id: chatId, message_id: messageId });
}

export function notifyMessageDeleted(userId, chatId, messageId) {
  sendMessage(TYPES.MESSAGE_DELETED, { user_id: userId, chat_id: chatId, message_id: messageId });
}

export function notifyUserWriting(userId, chatId) {
  sendMessage(TYPES.USER_START_WRITING, { user_id: userId, chat_id: chatId, message_id: 1 });
}

export function notifyUserWrote(userId, chatId) {
  sendMessage(TYPES.USER_STOP_WRITING, { user_id: userId, chat_id: chatId, message_id: 2 });
}
