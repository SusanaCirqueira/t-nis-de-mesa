import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ContatoPayload {
  nome?: string;
  whatsapp?: string;
  interesse?: string;
  mensagem?: string;
}

interface ContatoRecord {
  id: string;
  nome: string;
  whatsapp: string;
  interesse: string;
  mensagem: string;
  createdAt: string;
}

const DATA_DIR = path.resolve(__dirname, 'data');
const CONTATOS_FILE = path.join(DATA_DIR, 'contatos.json');

const INTERESSES_VALIDOS = new Set([
  'Participar',
  'Voluntariado',
  'Doar materiais',
  'Patrocínio',
  'Apoiar o projeto',
  'Outro',
]);

function readContatos(): ContatoRecord[] {
  try {
    if (!fs.existsSync(CONTATOS_FILE)) {
      return [];
    }
    const raw = fs.readFileSync(CONTATOS_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeContatos(records: ContatoRecord[]): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, {recursive: true});
  }
  fs.writeFileSync(CONTATOS_FILE, JSON.stringify(records, null, 2), 'utf-8');
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({limit: '64kb'}));

  app.get('/api/health', (_req, res) => {
    res.json({ok: true});
  });

  app.get('/api/contatos', (_req, res) => {
    const contatos = readContatos();
    res.json({total: contatos.length});
  });

  app.post('/api/contatos', (req, res) => {
    const body = (req.body || {}) as ContatoPayload;
    const nome = typeof body.nome === 'string' ? body.nome.trim() : '';
    const whatsapp = typeof body.whatsapp === 'string' ? body.whatsapp.trim() : '';
    const interesse =
      typeof body.interesse === 'string' && INTERESSES_VALIDOS.has(body.interesse)
        ? body.interesse
        : 'Participar';
    const mensagem = typeof body.mensagem === 'string' ? body.mensagem.trim().slice(0, 1000) : '';

    if (nome.length < 2 || nome.length > 120) {
      res.status(400).json({error: 'Informe um nome válido.'});
      return;
    }

    if (whatsapp) {
      const digits = whatsapp.replace(/\D/g, '');
      if (digits.length < 10 || digits.length > 11 || whatsapp.length > 15) {
        res.status(400).json({error: 'Informe um número de WhatsApp válido com DDD (10 ou 11 dígitos).'});
        return;
      }
    }

    const record: ContatoRecord = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      nome,
      whatsapp,
      interesse,
      mensagem,
      createdAt: new Date().toISOString(),
    };

    try {
      const current = readContatos();
      current.unshift(record);
      writeContatos(current.slice(0, 500));
      res.status(201).json({ok: true, id: record.id});
    } catch {
      res.status(500).json({error: 'Não foi possível registrar sua mensagem agora.'});
    }
  });

  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const {createServer: createViteServer} = await import('vite');
    const vite = await createViteServer({
      server: {middlewareMode: true},
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
