export function stepText(step:number){
  /*  0: Construção da sala (build)
      1: Jogo aberto para publico (Open)
      2: Jogo finalizado para entrada de resultados (run Game)
      3: Encerrar Sala e distribuir valores (finished) */
  
      if(step == 0){
        return "Em construção"
      }
      if(step == 1){
        return "Aberto"
      }
      if(step == 2){
        return "Em andamento"
      }
      if(step == 3){
        return "Finalizado"
      }
      return "Error"
    }
