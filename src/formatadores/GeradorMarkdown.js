export default class GeradorMarkdown {
  gerar(cidades) {
    let resultado = '# Relatório de Nomes de Cidades\n\n';

    for (const cidade of cidades) {
      resultado += `- ${cidade.nome}\n`;
    }

    return resultado;
  }
}