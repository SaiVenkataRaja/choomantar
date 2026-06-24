# --- Stage 1: Dependencies ---
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy lockfiles to install exact dependency trees
COPY package.json package-lock.json ./
RUN npm ci

# --- Stage 2: Builder ---
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Un-comment the following line to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# --- Stage 3: Runner (Production Security Layer) ---
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
# ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-privileged system user for runtime execution isolation (DevSecOps Best Practice)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy essential structural assets
COPY --from=builder /app/public ./public

# Set up automatic standalone build output optimization handles
# Note: Requires "output: 'standalone'" in your next.config.js
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000

# Next.js standalone outputs a minimal server.js file
CMD ["node", "server.js"]