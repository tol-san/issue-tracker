# Issue Tracker

This is a Next.js project using Prisma 7 with MySQL.

## Project Setup

### 1. Project Context
- **Next.js Version**: 16.1.1 (Compatible with React 19)
- **Prisma Version**: 7.2.0
- **Database**: MySQL

### 2. Important Folder Structure
```text
/issue-tracker
├── app/                 # Next.js App Router
├── lib/
│   └── prisma.ts       # Prisma Client singleton
├── prisma/             # Prisma Folder
│   ├── schema.prisma   # Your database schema
│   └── migrations/     # Generated SQL migrations
├── .env                # Database connection string
├── package.json        # Dependencies
└── prisma.config.ts    # Prisma CLI configuration (New in Prisma 7)
```

### 3. Installation Commands

Run these commands to install the verified versions for this project:

```bash
# Core Next.js & React
npm install next@16.1.1 react@19.2.3 react-dom@19.2.3

# Prisma ORM
npm install prisma@7.2.0 @prisma/client@7.2.0

# MySQL Driver & Adapter (Required for Prisma 7)
**Note**: Starting with Prisma 7, `@prisma/adapter-mariadb` is the **official unified adapter** for both MySQL and MariaDB. There is no separate `@prisma/adapter-mysql` package; this single adapter handles both.

```bash
npm install @prisma/adapter-mariadb@7.2.0 mariadb@3.4.5
```

### 4. Configuration

#### `prisma.config.ts`
Located in the root. Do **not** include the `engine` property in Prisma 7.
```typescript
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
```

#### `lib/prisma.ts`
The singleton instance for your database connection.
```typescript
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import mariadb from "mariadb";

const connectionString = `${process.env.DATABASE_URL}`;
// Prisma 7 uses the @prisma/adapter-mariadb for MySQL connections
const adapter = new PrismaMariaDb(connectionString);

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
```

### 5. Database Connection
Your `.env` file should contain your MySQL connection string:
```bash
DATABASE_URL="mysql://root:password@localhost:3306/issue-tracker"
```

### 6. Verification
Validate your setup with:
```bash
npx prisma validate
```

## Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
