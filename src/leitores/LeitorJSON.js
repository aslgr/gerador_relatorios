import { readFileSync } from 'node:fs';

export default class LeitorJSON {
  ler(caminho) {
    const conteudo = readFileSync(caminho, 'utf-8');
    const cidades = JSON.parse(conteudo);

    return cidades.map(cidade => ({
      nome: cidade.Nome
    }));
  }
}