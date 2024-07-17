import {TOKEN, URL} from '@/constants/config'

const socket = new WebSocket(`${URL}?token=${TOKEN}`)
console.log({TOKEN})

export const subscribe = (symbol: string) => {
  socket.send(JSON.stringify({type: 'subscribe', symbol}))
}

export const unsubscribe = (symbol: string) => {
  socket.send(JSON.stringify({type: 'unsubscribe', symbol}))
}

export const onMessage = (callback: (data: any) => void) => {
  socket.addEventListener('message', event => {
    const message = JSON.parse(event.data)
    if (message.type === 'trade') {
      callback(message.data)
    }
  })
}

export const onOpen = (callback: () => void) => {
  socket.addEventListener('open', () => {
    callback()
  })
}
