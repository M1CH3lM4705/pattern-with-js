import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export default class ArgvCommandsCliHelper {
  static init() {
    const args = new this();

    return args.init();
  }

  init() {
    return yargs(hideBin(process.argv))
      .command('ai <prompt>', 'Faz uma pergunta à IA', (yargs) => {
        return yargs
          .option('p', {
            alias: 'prompt',
            describe: 'Prompt para a IA',
            demandOption: true,
            type: 'string'
          })
          .argv;
      })
      .command('f', 'Comandos relacionados a futebol', (yargs) => {
        return yargs
          .option('l', {
            alias: 'league',
            describe: 'Liga a ser consultada (BSA: Brasileirão, BL1: Bundesliga, DED: Eredivisie, PD: Primeira Liga)',
            type: 'string',
            demandOption: true,
            choices: ['BSA', 'BL1', 'DED', 'PD']
          })
          .option('c', {
            alias: 'matches',
            describe: 'Mostrar resultados das partidas',
            type: 'boolean'
          })
          .option('t', {
            alias: 'table',
            describe: 'Mostrar tabela de classificação',
            type: 'boolean'
          })
          .argv;
      })
      .command('w', 'Consulta de clima')
      .help()
      .alias('h', 'help')
      .argv;
  }
}