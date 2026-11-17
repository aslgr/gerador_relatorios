export default class GeradorTXT {
  gerar(cidades) {
    let resultado = `Relatório de Nomes de Cidades
=============================
`;

    for (const cidade of cidades) {
      resultado += `* ${cidade.nome}\n`;
    }

    return resultado;
  }
}