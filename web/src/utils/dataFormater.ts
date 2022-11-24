function dateFormater(date:string):string {
  let dataAtualFormatada: string = '';
  
  try{
    let dataAtual = new Date(date)
    dataAtualFormatada = (adicionaZero(dataAtual.getDate().toString()) + "/" + (adicionaZero(dataAtual.getMonth()+1).toString()) + "/" + dataAtual.getFullYear());
    dataAtualFormatada += " as "+ adicionaZero(dataAtual.getHours()+":"+adicionaZero(dataAtual.getMinutes()))
  }catch(error){

  }

  return dataAtualFormatada
}

function adicionaZero(numero:string|number){
  if (numero <= 9) 
      return "0" + numero;
  else
      return numero; 
}


export {dateFormater}
