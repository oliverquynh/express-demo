Express Demo

## Requirements
- Node 24+
- PostgreSQL 18

## Installation

PostgreSQL must be ready first.

```bash
docker network create --subnet=172.18.0.0/16 demo_net

docker run \
    -e POSTGRES_PASSWORD=password123 \
    -e POSTGRES_USER=postgres_user \
    -e POSTGRES_DATABASE=postgres_db \
    --net demo_net \
    --ip 172.18.0.5 \
    --restart always \
    --detach \
    postgres:18-alpine
```



- Clone this repository

```bash
cd ~/path/to/workspace

git clone git@github.com:oliverquynh/express-demo.git

cd express-demo
```

- Copy .env.example to .env and update environment variables due to your needs, especially PostgreSQL.

```bash
cp .env.example .env
```

- Install Node packages.

```bash
npm install
```

- Run migrations

```bash
DATABASE_URL='postgres://postgres_user:password123@localhost:5401/postgres_db' npm run migrate up
```

- Start node server

```bash
npm start # http://localhost:3000
```

## Development

Use local PostgreSQL powered by Docker

```bash
docker compose -f docker/docker-compose.yml up -d
```

Run all tests

```bash
NODE_OPTIONS=--experimental-vm-modules jest
```

## Deployment

```bash
hapi deploy --stage=test --debug --config=node_version=24.12.0
```
