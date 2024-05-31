import axios from 'axios'
import { AppConfig } from '@/config'

interface IJWTToken {
  username: string,
  password: string
}

async function getJWT(loginData: IJWTToken) {
  await axios.post(
    `${AppConfig.baseAPI}/jwt/tokens`,
    new URLSearchParams({
      'username': loginData.username,
      'password': loginData.password,
    }),
    {
      headers: {
        'accept': 'application/json'
      }
    }
  ).then((response) => {
    localStorage.setItem('token', response.data.access_token)
    localStorage.setItem('refresh_token', response.data.refresh_token)
  })
}

async function getUserData() {
  const response = await axios.get(
    `${AppConfig.baseAPI}/user/`,
    {
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
  )
  return response.data
}

async function verifyEmail(email: string) {
  await axios.post(
    `${AppConfig.baseAPI}/user/verify-email/`,
    new URLSearchParams({
      'email': email
    }),
    {
      headers: {
        'accept': 'application/json'
      }
    }
  ).then((response) => {
    console.log(response)
  })
}

async function getAllChats () {
  const response = await axios.get(
    `${AppConfig.baseAPI}/chat/all`, {
    headers: {
      'accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  return response.data
}

async function getAllChatMessages (chatId: number) {
  const response = await axios.get(
    `${AppConfig.baseAPI}/chat/message/all?chat_id=106`, {
      params: {
        chat_id: chatId
      },
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
  })
  return response.data
}

async function getMessage (messageId: number) {
  const response = await axios.get(
    `${AppConfig.baseAPI}/chat/message/`, {
      params: {
        message_id: messageId
      },
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
  })
  return response.data
}

async function createMessage (message: string, chatId: number) {
  const response = await axios.post(
    `${AppConfig.baseAPI}/chat/message/`, "", {
      params: {
        text: message,
        chat_id: chatId
      },
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
  return response.data
}

async function getChatById (chatId: number) {
  const response = await axios.get(
    `${AppConfig.baseAPI}/chat/`, {
      params: {
        chat_id: chatId
      },
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
  })
  return response.data
}

export { getJWT, getUserData, verifyEmail, getAllChats, getAllChatMessages, getMessage, createMessage, getChatById }