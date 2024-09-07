export default class PromptAi {

  static promptClassification(obj) {
    return `
    '${JSON.stringify(obj)}'

Com base no array javscript que te enviei, 
quero que gere uma tabela no formato string onde eu possa exibir no terminal. 
a tabela precisa seguir uma ordem do menor para o maior a partir do valor position de cada objeto dentro array. 
nessa tabela preciso que exiba a posição o shortname do objeto team, os pontos(points) e numero de partidas jogadas(playedGames).
O cabeçalho deve está em pt-br e, tente deixar alinhado as colunas com o cabeçalho.
Me retorne somente tabela no formato string. não quero função javascript.
    `
  }

  static promptMatches(obj) {
    return `
      '${JSON.stringify(obj)}'

      Formato: Um array de objetos JavaScript, onde cada objeto representa um jogo com as propriedades: timeDaCasa, placar, visitante e vencedor.
Objetivo: Transformar esses dados em uma string formatada como uma tabela, com as colunas "Time da casa", "Placar" e "Visitante". Me retorne somente tabela no formato string. não quero função javascript.

______________________________________________
|Time da casa          Placar      Visitante  |

|Flamanego            (2) x (1)         Vasco |
_______________________________________________
    `
  }
}