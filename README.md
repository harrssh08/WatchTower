<div align="center">
  <img src="./public/webkorps-logo.svg" width="240" alt="Webkorps" />
</div>

# Webkorps

Webkorps is a self-hosted uptime and service monitoring dashboard. It provides a clean white and light-blue interface for monitoring websites, APIs, servers, ports, certificates, and other infrastructure.

## Features

- HTTP, TCP, ping, DNS, WebSocket, Docker, and push monitoring
- Configurable check intervals and incident history
- Notifications through email, Slack, Discord, Telegram, and other providers
- Public status pages
- Certificate expiry monitoring
- Two-factor authentication

## Local Development

### Requirements

- Node.js 26.2.0 or newer
- npm
- Git

### Start the application

```bash
git clone https://github.com/harrssh08/WatchTower.git
cd WatchTower
npm ci
npm run dev
```

Open <http://localhost:3000>. On the first run, follow the setup screen to create the administrator account.

## Docker

```bash
git clone https://github.com/harrssh08/WatchTower.git
cd WatchTower
docker compose up -d
```

Open <http://localhost:3001>. Application data is stored in the local `data` directory.

To stop the application:

```bash
docker compose down
```

## Useful Commands

| Command         | Purpose                                            |
| --------------- | -------------------------------------------------- |
| `npm run dev`   | Start the frontend and backend in development mode |
| `npm run build` | Create a production frontend build                 |
| `npm run lint`  | Run JavaScript and style checks                    |
| `npm test`      | Run backend and end-to-end tests                   |

## License

Licensed under the [MIT License](./LICENSE). This project is customized from [Uptime Kuma](https://github.com/louislam/uptime-kuma).
