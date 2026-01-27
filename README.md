# Rourepersonaltraining

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Free Intake form (email + TXT backup)

This project includes a simple PHP handler that receives the Free Intake form submission, sends:
- an email to the team
- a confirmation email to the client
- and writes a **one-line-per-client** backup TXT file (in case email fails).

### Files

- `public/form.php`: the form handler (copied into the build output by `angular.json` assets config)
- `public/emails/intake-confirmation.html`: HTML template (client confirmation)
- `public/emails/new-intake-request.html`: HTML template (team notification)

### Configuration (required)

Edit the variables at the top of `public/form.php`:

- `$FROM_EMAIL`: must be a valid mailbox on your domain (recommended for deliverability)
- `$TEAM_RECIPIENTS`: team destination email(s)

### SMTP (recommended)

`public/form.php` will send emails via **SMTP** when you configure these environment variables on the server:

- `ROURE_SMTP_HOST` (example: `mail.roure.nl`)
- `ROURE_SMTP_PORT` (example: `587`)
- `ROURE_SMTP_USER` (example: `info@roure.nl`)
- `ROURE_SMTP_PASSWORD` (your SMTP password)

If `ROURE_SMTP_PASSWORD` is not set, it falls back to PHP `mail()`.

### VPS Linux (recommended secret file)

On a VPS, the simplest secure option is to store SMTP credentials in a file **outside the web root**:

- Create relative to `form.php`, i.e. `../smtp.ini`
- Set permissions to be readable only by the web server user

Example:

```ini
host=mail.roure.nl
port=587
user=info@roure.nl
password=YOUR_PASSWORD
```

### Persistência do `intake-request.txt` (staging + produção)

Para garantir que o arquivo **não seja apagado em deploy**, configure um diretório de dados fora da pasta do site via variável de ambiente:

- `ROURE_DATA_DIR=/var/lib/roure`

O `form.php` vai criar (se não existir) e gravar em:

- `/var/lib/roure/intake-request.txt`
- `/var/lib/roure/smtp.ini` (se você usar o fallback por arquivo secreto)

Você pode usar diretórios diferentes por ambiente, por exemplo:

- produção: `ROURE_DATA_DIR=/var/lib/roure/prod`
- staging: `ROURE_DATA_DIR=/var/lib/roure/staging`

### Where is the TXT backup stored?

`form.php` stores the backup file **outside the web root**, in:

- `../_private/intake-request.txt` (relative to `form.php`)

Examples:
- If deployed at `/form.php`, the file is at `/_private/intake-request.txt`
- If deployed at `/staging/form.php`, the file is at `/_private/intake-request.txt` (next to `/staging/`)

### Server requirement

This requires a hosting/server that **executes PHP** for `form.php`.
If you're deploying only the Angular SSR Node server output, PHP will not run.

## Staging at `/staging/`

To build the app to run under `https://site.com/staging/`:

```bash
npm run build:staging
```

To run the SSR server locally using the `/staging` base path:

```bash
npm run serve:ssr:staging
```

If you are deploying behind a reverse-proxy, make sure requests to `/staging/*` reach this server, and your proxy does not rewrite away the `/staging` prefix (or set `BASE_PATH=/staging` accordingly).

## Deploy URL layout (production + staging)

This repo is designed to be deployed with these paths on the same domain:

- Production:
  - `/` (site)
  - `/api` (PHP backend)
  - `/dashboard` (CMS dashboard)
- Staging:
  - `/staging` (site)
  - `/staging/api` (PHP backend)
  - `/staging/dashboard` (CMS dashboard)

### Quick post-deploy verification

1. API is reachable:
   - `GET /api/content.json`
   - `GET /staging/api/content.json` (should be different from prod if you keep staging isolated)
2. Dashboard loads:
   - `/dashboard`
   - `/staging/dashboard`
3. Login + upload works in both environments:
   - Login cookie is scoped correctly (prod uses `/api`, staging uses `/staging/api`)
   - Upload returns the correct URL prefix:
     - prod: `/api/uploads/...`
     - staging: `/staging/api/uploads/...`

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
