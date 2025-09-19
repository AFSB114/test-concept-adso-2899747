# Deployment Guide - Medical Dashboard

## Vercel Deployment (Recommended)

### Prerequisites
- Vercel account
- GitHub repository
- Backend API deployed and accessible

### Steps

1. **Connect Repository to Vercel**
   \`\`\`bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   
   # Deploy from project directory
   vercel --prod
   \`\`\`

2. **Environment Variables**
   Set in Vercel dashboard or via CLI:
   \`\`\`bash
   vercel env add NEXT_PUBLIC_API_BASE_URL
   # Enter: https://your-api-domain.com/api
   \`\`\`

3. **Build Settings**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

### Custom Domain
\`\`\`bash
# Add custom domain
vercel domains add yourdomain.com
vercel alias your-deployment-url.vercel.app yourdomain.com
\`\`\`

## Docker Deployment

### Dockerfile
\`\`\`dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
\`\`\`

### Docker Compose
\`\`\`yaml
version: '3.8'
services:
  medical-dashboard:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_BASE_URL=http://api:8080/api
    depends_on:
      - api
    networks:
      - medical-network

  api:
    image: your-backend-image:latest
    ports:
      - "8080:8080"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/medical
    depends_on:
      - db
    networks:
      - medical-network

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=medical
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - medical-network

volumes:
  postgres_data:

networks:
  medical-network:
    driver: bridge
\`\`\`

## AWS Deployment

### Using AWS Amplify

1. **Connect Repository**
   - Go to AWS Amplify Console
   - Connect your GitHub repository
   - Select branch (main/master)

2. **Build Settings**
   \`\`\`yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   \`\`\`

3. **Environment Variables**
   \`\`\`
   NEXT_PUBLIC_API_BASE_URL=https://your-api.amazonaws.com/api
   \`\`\`

### Using EC2 + PM2

1. **Server Setup**
   \`\`\`bash
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install PM2
   npm install -g pm2
   
   # Install Nginx
   sudo apt update
   sudo apt install nginx
   \`\`\`

2. **Application Deployment**
   \`\`\`bash
   # Clone repository
   git clone https://github.com/your-repo/medical-dashboard.git
   cd medical-dashboard
   
   # Install dependencies
   npm install
   
   # Build application
   npm run build
   
   # Start with PM2
   pm2 start npm --name "medical-dashboard" -- start
   pm2 save
   pm2 startup
   \`\`\`

3. **Nginx Configuration**
   \`\`\`nginx
   server {
       listen 80;
       server_name yourdomain.com;
   
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   \`\`\`

## Environment Variables

### Development
\`\`\`bash
# .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
\`\`\`

### Production
\`\`\`bash
# Production environment variables
NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com/api
\`\`\`

## SSL/HTTPS Setup

### Using Certbot (Let's Encrypt)
\`\`\`bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d yourdomain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
\`\`\`

## Monitoring and Logging

### PM2 Monitoring
\`\`\`bash
# Monitor processes
pm2 monit

# View logs
pm2 logs medical-dashboard

# Restart application
pm2 restart medical-dashboard
\`\`\`

### Health Checks
\`\`\`bash
# Add health check endpoint
curl https://yourdomain.com/api/health
\`\`\`

## Performance Optimization

### Next.js Optimizations
\`\`\`javascript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  compress: true,
  images: {
    domains: ['your-cdn-domain.com'],
  },
  experimental: {
    optimizeCss: true,
  },
}

export default nextConfig
\`\`\`

### CDN Setup
- Configure CloudFront (AWS) or CloudFlare
- Cache static assets
- Enable gzip compression
- Set appropriate cache headers

## Backup Strategy

### Database Backups
\`\`\`bash
# PostgreSQL backup
pg_dump -h localhost -U user medical > backup_$(date +%Y%m%d_%H%M%S).sql

# Automated backup script
#!/bin/bash
BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump -h localhost -U user medical > $BACKUP_DIR/medical_$DATE.sql
find $BACKUP_DIR -name "medical_*.sql" -mtime +7 -delete
\`\`\`

### Application Backups
\`\`\`bash
# Code backup (if not using Git)
tar -czf medical-dashboard-$DATE.tar.gz /path/to/medical-dashboard

# Environment variables backup
cp .env.local .env.backup.$DATE
