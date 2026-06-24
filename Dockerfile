# --- Stage 1: Dependencies ---
# Changed from node:18-alpine to node:20-alpine
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy lockfiles to install exact dependency trees
COPY package.json package-lock.json ./
RUN npm ci

# --- Stage 2: Builder ---
# Changed from node:18-alpine to node:20-alpine
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# --- Stage 3: Runner (Production Security Layer) ---
# Changed from node:18-alpine to node:20-alpine
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create a non-privileged system user for runtime execution isolation
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy essential structural assets
COPY --from=builder /app/public ./public

# Set up automatic standalone build output optimization handles
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]