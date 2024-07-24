import {useEffect, useRef, useState} from 'react'
import {subscribe, unsubscribe, onMessage, onOpen} from '@/services/WebSocketService'
import {Stock} from '@/types/schemas/stock'
import {symbols} from '@/constants/symbols'

export const useWebSocket = () => {
  const [data, setData] = useState<Stock[]>([])
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null)

  const debounce = (func: (...args: any[]) => void, wait: number) => {
    return (...args: any[]) => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current)
      }
      debounceTimeout.current = setTimeout(() => func(...args), wait)
    }
  }

  // Función para manejar los mensajes del WebSocket
  const handleWebSocketMessage = debounce((newData: Stock[]) => {
    setData(prevData => {
      const updatedData = [...prevData]
      newData.forEach(trade => {
        const index = updatedData.findIndex(item => item.s === trade.s)
        if (index !== -1) {
          updatedData[index] = trade
        } else {
          updatedData.push(trade)
        }
      })
      return updatedData
    })
  }, 200) // Ajusta el tiempo de debounce según sea necesario

  useEffect(() => {
    onOpen(() => {
      symbols.forEach(symbol => subscribe(symbol))
    })

    onMessage((newData: Stock[]) => {
      handleWebSocketMessage(newData)
    })

    return () => {
      symbols.forEach(symbol => unsubscribe(symbol))
    }
  }, [])

  return data
}
