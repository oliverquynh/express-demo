from hapi import Context
from hapi.cli import app
from hapi.recipe import Express, Common

# Recipes

app.load(Common)

# Config

app.put('stage', 'live')

app.put('name', 'Express Demo')
app.put('deploy_path', '~/express-demo/{{stage}}')
app.put('repository', 'https://github.com/oliverquynh/express-demo.git')
app.put('branch', 'main')

app.add('shared_files', [
    '.env',
    'pg.config.json',
])

# Bindings

def bin_npm(c: Context):
    if not c.test("[ -d $HOME/.nvm ]"):
        c.raise_error(
            "nvm might not installed. Please install nvm to use node and npm."
        )

    if not c.test("[ -d $HOME/.nvm/versions/node/v{{node_version}} ]"):
        c.raise_error(
            "node version {{node_version}} does not exist. Try run 'nvm install {{node_version}}'."
        )

    return 'export PATH="$HOME/.nvm/versions/node/v{{node_version}}/bin:$PATH"; npm'

app.bind('bin/npm', bin_npm)

# Tasks

@app.task(name='deploy:pg', desc='Create the PG config file')
def deploy_pg(c: Context):
    c.cd('{{release_path}}')

    if c.test("[ -f pg.config.json ]"):
        c.info("The pg.config.json file already exists ({{release_path}}/pg.config.json)")
        return

    if c.test("[ ! -f pg.config.json.example ]"):
        c.info(
            "The pg.config.json.example file does not exist ({{release_path}}/pg.config.json.example)"
        )
        return

    c.run("cp pg.config.json.example pg.config.json")

    c.info("The pg.config.json file is created ({{release_path}}/pg.config.json)")

@app.task(name="npm:ci", desc="Clean install node packages")
def npm_ci(c: Context):
    c.cd('{{release_path}}')
    c.run('{{bin/npm}} ci')

@app.task(name='npm:migrate', desc='Run database migrations')
def npm_migrate(c: Context):
    c.cd('{{release_path}}')
    c.run('{{bin/npm}} run migrate up')

@app.task(name='deploy:restart', desc='Restart all running processes')
def deploy_restart(c: Context):
    c.sudo('supervisorctl restart express-demo_{{stage}}:*')

app.group(name='deploy:main', desc='Deploy main activities', do=[
    'npm:ci',
    'npm:migrate'
])

# Hooks

app.after('deploy:env', 'deploy:pg')
app.after('deploy:symlink', 'deploy:restart')
