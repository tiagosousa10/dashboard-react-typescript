const formatCurrency = (current: number) : string => {
   return current.toLocaleString(
      'pt-PT', {style:'currency', currency:'EUR'}
   )
}

export default formatCurrency;
