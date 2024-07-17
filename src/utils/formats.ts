export const formatPrice = (price: number) => {
  return `$${price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
}

export const formatSymbol = (symbol: string): string => {
  const [exchange, pair] = symbol.split(':')
  const base = pair.slice(0, 3)
  const quote = pair.slice(3)
  return `${exchange} - ${base}/${quote}`
}
