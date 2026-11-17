import { extname } from 'node:path';

import LeitorJSON from './src/leitores/LeitorJSON.js';
import LeitorCSV from './src/leitores/LeitorCSV.js';

import GeradorHTML from './src/formatadores/GeradorHTML.js';
import GeradorTXT from './src/formatadores/GeradorTXT.js';
import GeradorMarkdown from './src/formatadores/GeradorMarkdown.js';

// Componentes disponíveis
const leitores = {
  '.json': new LeitorJSON(),
  '.csv': new LeitorCSV()
};

const geradores = {
  html: new GeradorHTML(),
  txt: new GeradorTXT(),
  md: new GeradorMarkdown()
};

// Argumentos da linha de comando
const argumentos = process.argv.slice(2);

const indiceFonte = argumentos.indexOf('--fonte');
const indiceFormato = argumentos.indexOf('--formato');

const caminho = indiceFonte >= 0 ? argumentos[indiceFonte + 1] : undefined;
const formato = indiceFormato >= 0 ? argumentos[indiceFormato + 1] : undefined;

try {
  if (!caminho || !formato) {
    throw new Error(
      'Uso: node index.js --fonte <arquivo> --formato <html|txt|md>'
    );
  }

  const extensao = extname(caminho).toLowerCase();

  const leitor = leitores[extensao];
  const gerador = geradores[formato.toLowerCase()];

  if (!leitor) {
    throw new Error(`Fonte não suportada: ${extensao}`);
  }

  if (!gerador) {
    throw new Error(`Formato não suportado: ${formato}`);
  }

  const cidades = leitor.ler(caminho);
  const relatorio = gerador.gerar(cidades);

  console.log(relatorio);

} catch (erro) {
  console.error(`Erro: ${erro.message}`);
  process.exitCode = 1;
}