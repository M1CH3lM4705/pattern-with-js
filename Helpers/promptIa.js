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
}