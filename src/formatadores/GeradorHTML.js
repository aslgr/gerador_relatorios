export default class GeradorHTML {
  gerar(cidades) {
    let resultado = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Relatório de Nomes de Cidades</title>
</head>
<body>
  <h1>Relatório de Nomes de Cidades</h1>
  <ul>
`;

    for (const cidade of cidades) {
      resultado += `    <li>${cidade.nome}</li>\n`;
    }

    resultado += `  </ul>
</body>
</html>`;

    return resultado;
  }
}