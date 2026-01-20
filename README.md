# Mudra – Digital E‑Wallet

Mudra is a **digital wallet** that supports **peer‑to‑peer (P2P) transfers** and **bank‑to‑wallet transfers**, built with a **production‑grade monorepo** setup. The system is designed with  data consistency, secure authentication, and  separation between frontend, backend, and shared packages.

---

## Core Features

* Peer‑to‑Peer (P2P) wallet transfers
* Bank‑to‑Wallet balance loading
*  Authentication with NextAuth
*  Transaction history & balance tracking
*  Atomic, consistent transfers
* Monorepo architecture using Turborepo

---

## Tech Stack

### Frontend

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* NextAuth (Credentials / OAuth ready)

### Backend

* Node.js
* TypeScript
* PostgreSQL
* Prisma ORM
* Zod (request & schema validation)
* REST APIs for wallet & bank operations

### Monorepo Tooling

* Turborepo
* pnpm
* Shared ESLint & TypeScript configs

---

## Repository Structure

```
.
├── apps/
│   ├── user_app/            # Next.js frontend (wallet UI)
│   ├── merchant_app/        # Merchant / admin backend APIs
│   └── bank_webhook/        # Dummy bank server (onramp success callbacks)
│
├── packages/
│   ├── db/                 # Prisma schema & client
│   ├── ui/                 # Shared UI components (Tailwind)
│   ├── types/              # Shared TypeScript types
│   ├── eslint-config/      # Shared ESLint config
│   └── tsconfig/           # Shared TS configs
│
├── turbo.json
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

---

## Authentication Flow (NextAuth)

1. User signs up / signs in via NextAuth.
2. A wallet is created automatically on first signup.
3. User sessions are validated on both frontend and backend.
4. All transfer APIs require an authenticated session.

Sessions are treated as the **single source of identity**.

---

## Wallet & Transfer Model

### Wallet

- One wallet per user
- Balance stored as an integer (smallest currency unit)

### Transfers

#### P2P Transfer

- Sender → Receiver wallet
- Balance updated atomically inside a DB transaction

#### Bank → Wallet Transfer

- Handled via a **dummy bank webhook server**
- Bank server accepts:
  - `token`
  - `amount`
  - `user_identifier`
- Valid requests are immediately marked as **SUCCESS**
- A successful callback creates an `OnrampTransaction`
- Wallet balance is updated atomically

All transfers are **ACID‑safe** using PostgreSQL transactions.

---

## Database Design (High Level)

- `User`
  - Authentication identity (NextAuth)

- `Balance`
  - One row per user
  - Stores current wallet balance (integer, smallest unit)

- `OnrampTransaction`
  - Bank → Wallet credits
  - Tracks amount, status (PENDING / SUCCESS / FAILED)
  - Source of truth for external money entering the system

- `P2PTransfer`
  - Wallet → Wallet transfers
  - Sender, receiver, amount
  - Executed atomically with balance updates

Every balance change is driven by either an **OnrampTransaction** or a **P2PTransfer**. Direct balance mutations are not allowed.

---

## Local Development

### Install Dependencies

## Environment Variables

### Frontend (`apps/web/.env`)

```
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
```

### Backend (`apps/api-backend/.env`)

```
DATABASE_URL=postgresql://user:password@localhost:5432/mudra
```

---

## Design Principles

* **Money is never updated without a transaction**
* **All balance changes are atomic**
* **Zod-enforced runtime validation at all boundaries**
* **Shared types between frontend and backend**
* **Clear separation of auth, wallet, and transfer logic****

---

## Limitations (Intentional)

* No real bank integration (mocked / simulated)
* No multi‑currency support
* No scheduled payments

---

## Future Improvements

* Real bank integrations
* Webhook‑based payment confirmations
* Multi‑currency wallets
* Rate limiting & fraud detection
* Admin dashboard

---

## License

Lavanshu-ai
