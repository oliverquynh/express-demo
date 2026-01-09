Express Demo

## Requirements
- Node 24+
- PostgreSQL 18

## Installation

> PostgreSQL must be ready first

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
npm run migrate
```

- Start node server

```bash
npm start # http://localhost:3000
```

## Development

Run all tests

```bash
NODE_OPTIONS=--experimental-vm-modules jest
```
