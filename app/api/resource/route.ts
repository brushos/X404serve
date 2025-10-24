import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const resourceSecret = process.env.RESOURCE_SECRET || "404"
  const authHeader = request.headers.get("x-resource-secret")

  // Check if authorized
  const isAuthorized = authHeader === resourceSecret

  if (!isAuthorized) {
    // Return 402 Payment Required
    return NextResponse.json(
      {
        paymentRequired: true,
        message: process.env.PAYMENT_REQUIRED_TEXT || "Payment required to access 404 resource",
        token: "404",
        standard: "x402",
        status: "PAYMENT_REQUIRED",
        hint: "Send header: x-resource-secret: 404",
        errorCode: "INSUFFICIENT_FUNDS",
        timestamp: new Date().toISOString(),
      },
      { status: 402 },
    )
  }

  // Return 200 OK with success message
  return NextResponse.json(
    {
      success: true,
      token: "404",
      message: "Welcome to the 404 Meme Server, bro! 🚀",
      status: "AUTHORIZED",
      data: {
        resourceName: "404",
        resourceType: "meme",
        accessLevel: "premium",
        unlocked: true,
        memeContent: "You found the legendary 404 token! This is rarer than a bug-free deployment. 🎉",
      },
      timestamp: new Date().toISOString(),
      standard: "x402",
    },
    { status: 200 },
  )
}

export async function POST(request: NextRequest) {
  // Also support POST requests
  return GET(request)
}

export async function HEAD(request: NextRequest) {
  // Support HEAD requests for x402scan detection
  const resourceSecret = process.env.RESOURCE_SECRET || "404"
  const authHeader = request.headers.get("x-resource-secret")
  const isAuthorized = authHeader === resourceSecret

  return new NextResponse(null, {
    status: isAuthorized ? 200 : 402,
    headers: {
      "x-resource-token": "404",
      "x-resource-standard": "x402",
      "x-resource-name": "404",
    },
  })
}
