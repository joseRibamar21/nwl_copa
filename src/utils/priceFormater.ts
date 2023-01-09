export function priceFormater(price:number){

  console.log(price/100)
  let valor = String(price/100).replace(',',".")
  let valorFloat = parseFloat(valor)
  return new Intl.NumberFormat('pt-BR',{style: "currency",currency:"BRL"}).format(valorFloat)
}
