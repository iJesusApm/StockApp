import React, {createContext, useContext} from 'react'
import {Stock} from '@/types/schemas/stock'
import {useWebSocket} from '@/hooks/useWebSocket'

interface WebSocketContextProps {
  data: Stock[]
}

const WebSocketContext = createContext<WebSocketContextProps | undefined>(undefined)

interface WebSocketProviderProps {
  children: React.ReactNode
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({children}) => {
  const data = useWebSocket()

  return <WebSocketContext.Provider value={{data}}>{children}</WebSocketContext.Provider>
}

export const useWebSocketData = () => {
  const context = useContext(WebSocketContext)
  if (context === undefined) {
    throw new Error('useWebSocketData must be used within a WebSocketProvider')
  }
  return context.data
}
