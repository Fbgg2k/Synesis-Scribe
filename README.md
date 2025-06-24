# Synesis Bio - Guia Completo de Instalação e Inicialização

Este guia reúne instruções detalhadas para instalar, configurar e iniciar o ecossistema Synesis Bio, incluindo o frontend (Synesis Scribe), Chatwoot, n8n, banco de dados e demais serviços necessários. Siga os passos abaixo para garantir que tudo funcione corretamente após ligar o computador ou reiniciar o servidor.

---

## 📦 Sobre o Synesis Scribe (Frontend)

O **Synesis Scribe** é o frontend Next.js do Synesis Bio, servindo como interface para o usuário interagir com o sistema, visualizar dados e gerenciar configurações. Ele oferece:

- **Dashboard** com visão geral dos canais conectados, conversas recentes e eventos de calendário.
- **Chat interativo** para receber e enviar mensagens, com respostas inteligentes geradas por LLM.
- **Respostas por voz** (via ElevenLabs).
- **Histórico de conversas** e integração com calendário.
- **Gerenciamento de configurações** para integrações como Supabase, ElevenLabs, Google Calendar e canais de comunicação.

O frontend se conecta a um backend robusto (Chatwoot, n8n, banco, etc.) responsável pela automação e integrações.

---

## 🚀 Instalação e Inicialização do Synesis Bio

### 1. Baixe o projeto do GitHub

Clone o repositório:

```sh
git clone https://github.com/Fbgg2k/Synesis-Scribe.git
cd Synesis_Bio
```

### 2. Inicie os containers principais

No terminal, execute:

```sh
docker-compose -f docker-compose.coolify.yaml up -d
```

Isso inicia Chatwoot, banco de dados, Redis, Baileys, etc.

### 3. Corrija permissões da pasta do n8n (se necessário)

Se for a primeira vez ou se o n8n não iniciar corretamente:

```sh
sudo chown -R 1000:1000 ./backend/.n8n
```

### 4. Inicie o serviço do n8n

```sh
docker-compose -f docker-compose.n8n.yaml up -d
```

### 5. Verifique se todos os containers estão rodando

```sh
docker ps
```

Todos devem aparecer com STATUS "Up".

### 6. Reinicie containers problemáticos

Se algum container estiver com STATUS "Exited" ou "Restarting":

```sh
docker restart <nome_ou_id_do_container>
```

### 7. Acesse os sistemas

- **Frontend (Synesis Scribe):**  
    [http://localhost:9002](http://localhost:9002)
- **Chatwoot:**  
    [http://localhost:3000](http://localhost:3000)

    > **No n8n (dentro do Docker):**  
    > Use `http://rails:3000` para todas as integrações e automações com o Chatwoot.
    >
    > **No navegador do seu computador:**  
    > Use `http://localhost:3000` ou `http://127.0.0.1:3000` para acessar a interface web do Chatwoot.
    >
    > **Resumo:**  
    > - `rails:3000` → só funciona entre containers Docker na mesma rede (ex: n8n ↔ Chatwoot)  
    > - `localhost:3000` ou `127.0.0.1:3000` → só funciona no navegador do seu sistema operacional
    >
    > Se seguir assim, tudo funcionará corretamente!
- **n8n:**  
    [http://localhost:5678](http://localhost:5678)

> Em VPS, troque "localhost" pelo IP do servidor.

### 8. Parando os serviços

Para encerrar todos os serviços:

```sh
docker-compose -f docker-compose.coolify.yaml down
docker-compose -f docker-compose.n8n.yaml down
```

**Dica:**  
Se aparecer aviso de "orphan containers", use:

```sh
docker-compose -f docker-compose.n8n.yaml up -d --remove-orphans
```

---

## 📁 Estrutura do Projeto (Root)

```
Synesis_Bio/
├── Arquivo exemplo.pdf
├── Internship Case for SynesisBio.pdf
├── README.md
├── backend/
├── docker-compose.coolify.yaml
├── docker-compose.n8n.yaml
├── node_modules/
├── package.json
├── package-lock.json
├── [SELF-HOST]_Workflows_Chatwoot/
├── [SELF-HOST]_Workflows_Evolution_API/
├── [Supabase] Criar histórico e fila de mensagens (1).sql
├── Synesis-Scribe-frontend/
├── Synesis-Scribe-frontend.zip
```

Esta estrutura mostra os principais arquivos e pastas do diretório raiz do projeto Synesis_Bio, incluindo configurações, código-fonte, dependências e materiais de apoio.

## 📂 Estrutura do Projeto (Backend)

```
backend/
├── docker-compose.yml           # Configuração dos containers do backend
├── .n8n/                        # Dados e configurações do n8n
│   ├── binaryData/              # Arquivos binários utilizados em fluxos
│   ├── config/                  # Configurações do n8n
│   ├── database.sqlite          # Banco de dados SQLite do n8n
│   ├── n8nEventLog.log          # Logs de eventos do n8n
│   ├── n8nEventLog-1.log
│   ├── n8nEventLog-2.log
│   ├── node_modules/            # Dependências do n8n
│   ├── nodes/                   # Nodes customizados ou instalados
│   ├── package.json             # Dependências e scripts do n8n
│   └── package-lock.json        # Lockfile das dependências
```

---
##
Guarde este guia para referência rápida! Para detalhes sobre integrações específicas, consulte a documentação de cada serviço.

### 🎥 Vídeo-tutorial recomendado

Confira também o [vídeo-tutorial abaixo](https://www.youtube.com/watch?v=cvTWGNJGAu4), que apresenta passo a passo a criação de uma secretária virtual utilizando N8N, Chatwoot/Baileys ou Evolution API, Google Calendar, Supabase, ElevenLabs e outras integrações essenciais para o projeto.

