import { readFileSync } from 'node:fs';

export default class LeitorCSV {
  ler(caminho) {
    const conteudo = readFileSync(caminho, 'utf-8');
    const linhas = conteudo.trim().split(/\r?\n/);

    const cabecalho = linhas.shift().split(',');
    const indiceNome = cabecalho.indexOf('NOME');

    if (indiceNome === -1) {
      throw new Error('CSV sem coluna NOME');
    }

    return linhas
      .filter(linha => linha.trim() !== '')
      .map(linha => ({
        nome: linha.split(',')[indiceNome].trim()
      }));
  }
}
