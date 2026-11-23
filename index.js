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

const formato = argumentos
  .find(arg => arg.startsWith('--format='))
  ?.slice('--format='.length);

const caminho = argumentos
  .find(arg => arg.startsWith('--source='))
  ?.slice('--source='.length);

try {
  if (!formato || !caminho) {
    throw new Error(
      'Uso: node index.js --format=<html|txt|md> --source=<arquivo>'
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