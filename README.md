# Next.js Project Setup (ESLint + Prettier)

This guide explains how to create a new **Next.js** project and configure **Prettier**, **ESLint**, and **VS Code** for consistent code formatting and linting.

---

# 1. Create a new Next.js project

```bash
npx create-next-app@latest my-next-app
cd my-next-app
```

If you choose **TypeScript** during setup, Next.js will install it automatically.

---

# 2. Install Prettier and ESLint dependencies

```bash
npm install -D prettier eslint-config-prettier
```

---

# 3. Create Prettier configuration

Create a file in the root of the project:

`.prettierrc`

```json
{
  "singleQuote": true,
  "trailingComma": "all",
  "semi": true,
  "jsxSingleQuote": true,
  "bracketSpacing": true,
  "arrowParens": "always"
}
```

---

# 4. Create `.prettierignore`

Create a file in the root of the project:

`.prettierignore`

```
node_modules
.next
out
build
coverage
```

This prevents Prettier from formatting generated or build files.

---

# 5. Configure ESLint

Create the file:

`eslint.config.mjs`

```javascript
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);
```

This configuration includes:

- Next.js recommended rules
- TypeScript support
- Prettier compatibility
- Ignored build files

---

# 6. Configure VS Code (optional but recommended)

Create a folder:

```
.vscode
```

Inside it create:

`settings.json`

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "files.autoSave": "onFocusChange"
}
```

This enables:

- automatic formatting on save
- ESLint validation
- automatic file saving

---

# 7. Add scripts to `package.json`

```json
"scripts": {
  "lint": "eslint",
  "format": "prettier --write ."
}
```

Now you can run:

```bash
npm run lint
npm run format
```

---

# 8. Verify formatting and linting

Create a JavaScript or TypeScript file with messy code:

```javascript
const foo = { name: 'Alex', age: 25 };
const greet = (x) => console.log('Hello', x);
```

Save the file.

If everything is configured correctly, **Prettier will automatically format the code in VS Code**.

You can also run formatting manually:

```bash
npm run format
```

Check ESLint:

```bash
npm run lint
```

---

# Result

Your project now has:

- automatic formatting with **Prettier**
- code quality checks with **ESLint**
- seamless integration with **Next.js**
- automatic formatting in **VS Code**

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
