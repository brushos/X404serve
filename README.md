# 🎮 404 - x402 Compliant Glitch Meme Server

A hilarious, glitch-themed x402 resource server that returns HTTP 402 Payment Required. Detectable by [x402scan.com](https://www.x402scan.com).

## 🚀 Features

- **Glitch-themed landing page** with neon colors and funny meme vibes
- **x402-compliant API endpoint** at `/api/resource`
- **HTTP 402 Payment Required** response when unauthorized
- **HTTP 200 OK** response with meme content when authorized
- **Detectable by x402scan** with proper metadata
- **Environment variable support** for customization

## 📋 Requirements

- Node.js 18+
- Vercel account (for deployment)

## 🛠️ Setup

### Local Development

\`\`\`bash
npm install
npm run dev
\`\`\`

Visit `http://localhost:3000` to see the landing page.

### Environment Variables

Add these to your Vercel project settings or `.env.local`:

\`\`\`env
RESOURCE_SECRET=404
PAYMENT_REQUIRED_TEXT=Payment required to access 404 resource
\`\`\`

## 🔌 API Usage

### Without Authorization (Returns 402)

\`\`\`bash
curl -X GET https://your-app.vercel.app/api/resource
\`\`\`

Response:
\`\`\`json
{
  "paymentRequired": true,
  "message": "Payment required to access 404 resource",
  "token": "404",
  "standard": "x402",
  "status": "PAYMENT_REQUIRED",
  "hint": "Send header: x-resource-secret: 404"
}
\`\`\`

### With Authorization (Returns 200)

\`\`\`bash
curl -X GET https://your-app.vercel.app/api/resource \
  -H "x-resource-secret: 404"
\`\`\`

Response:
\`\`\`json
{
  "success": true,
  "token": "404",
  "message": "Welcome to the 404 Meme Server, bro! 🚀",
  "status": "AUTHORIZED",
  "data": {
    "resourceName": "404",
    "resourceType": "meme",
    "accessLevel": "premium",
    "unlocked": true,
    "memeContent": "You found the legendary 404 token! This is rarer than a bug-free deployment. 🎉"
  }
}
\`\`\`

## 🎯 x402 Compliance

This server is fully x402-compliant:

- ✅ Returns `HTTP 402 Payment Required` for unauthorized requests
- ✅ Returns `HTTP 200 OK` for authorized requests
- ✅ Includes `x402-metadata.json` for discovery
- ✅ Supports `HEAD` requests for scanner detection
- ✅ Includes proper response headers

## 📡 x402scan Detection

The server can be detected by [x402scan.com](https://www.x402scan.com):

1. Deploy to Vercel
2. Visit x402scan.com
3. Enter your app URL
4. Scanner will detect the x402 resource

## 🚀 Deployment

### Deploy to Vercel

\`\`\`bash
vercel deploy
\`\`\`

Or connect your GitHub repo to Vercel for automatic deployments.

## 📚 References

- [x402 GitHub](https://github.com/Merit-Systems/x402scan)
- [x402scan Explorer](https://www.x402scan.com)
- [HTTP 402 Spec (MDN)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/402)
- [Vercel Deployment Docs](https://vercel.com/docs/functions/serverless-functions/quickstart)

## 🎨 Customization

### Change the Token

Update `RESOURCE_SECRET` environment variable to any value you want.

### Change Payment Message

Update `PAYMENT_REQUIRED_TEXT` environment variable.

### Modify Landing Page

Edit `app/page.tsx` to customize the glitch animations and meme content.

## 📝 License

MIT - Feel free to fork and create your own meme servers!

---

**Made with 💜 and glitches** ✨
