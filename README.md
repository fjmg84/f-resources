# f-resources

Coleccion de recursos curados, migrada de SvelteKit a Next.js 15 con App Router.

## Desarrollo

```bash
pnpm install
pnpm run dev
```

## Build

```bash
pnpm exec next build
pnpm run start
```

## Variables de entorno

Crea un archivo `.env` tomando como referencia `.env.example`.

Variables principales:

- `AUTH_SECRET`
- `AUTH_URL`
- `AUTH_GOOGLE_ID`
- `AUTH_GOOGLE_SECRET`
- `GRAPHQL_URL`
- `HYGRAPH_MUTATION_TOKEN`
- `NOT_IMAGE`

Compatibilidad temporal con la migracion:

- `CLIENT_ID` funciona como fallback de `AUTH_GOOGLE_ID`
- `SECRET_ID` funciona como fallback de `AUTH_GOOGLE_SECRET`
- `VITE_GRAPHQL_URL` funciona como fallback de `GRAPHQL_URL`

## Google OAuth

En Google Cloud Console, el cliente OAuth debe tener estas URIs autorizadas:

- `http://localhost:3000/api/auth/callback/google`
- `https://tu-dominio.com/api/auth/callback/google`

Y en `Authorized JavaScript origins`:

- `http://localhost:3000`
- `https://tu-dominio.com`

Si vienes de SvelteKit, revisa que no haya quedado registrado el callback anterior. En NextAuth el callback correcto es `/api/auth/callback/google`.
