"use client"

import { useState, useEffect } from "react"

export default function Home() {
  const [glitchActive, setGlitchActive] = useState(false)
  const [authorized, setAuthorized] = useState(false)
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<any>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive((prev) => !prev)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const testEndpoint = async (withToken = false) => {
    setLoading(true)
    try {
      const headers: Record<string, string> = {}
      if (withToken) {
        headers["x-resource-secret"] = "404"
      }

      const res = await fetch("/api/resource", { headers })
      const data = await res.json()

      setResponse({
        status: res.status,
        data,
        authorized: res.status === 200,
      })
      setAuthorized(res.status === 200)
    } catch (error) {
      setResponse({ error: String(error) })
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white overflow-hidden">
      {/* Animated background grid */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(255,0,255,0.05)_25%,rgba(255,0,255,0.05)_26%,transparent_27%,transparent_74%,rgba(255,0,255,0.05)_75%,rgba(255,0,255,0.05)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(255,0,255,0.05)_25%,rgba(255,0,255,0.05)_26%,transparent_27%,transparent_74%,rgba(255,0,255,0.05)_75%,rgba(255,0,255,0.05)_76%,transparent_77%,transparent)] bg-[length:50px_50px]" />
      </div>

      {/* Glitch scanlines */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,0,255,0.3)_2px,rgba(255,0,255,0.3)_4px)] animate-pulse" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Main content */}
        <div className="text-center space-y-8 max-w-2xl">
          {/* Glitch title */}
          <div className="relative h-32 flex items-center justify-center">
            <div
              className={`text-7xl font-black tracking-wider transition-all duration-300 ${glitchActive ? "translate-x-1 opacity-80" : "translate-x-0 opacity-100"}`}
            >
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-lg">
                404
              </span>
            </div>
            {/* Glitch effect layers */}
            <div
              className={`absolute text-7xl font-black tracking-wider text-pink-500 opacity-0 transition-opacity duration-300 ${glitchActive ? "opacity-70" : "opacity-0"} translate-x-2`}
            >
              404
            </div>
            <div
              className={`absolute text-7xl font-black tracking-wider text-cyan-500 opacity-0 transition-opacity duration-300 ${glitchActive ? "opacity-70" : "opacity-0"} -translate-x-2`}
            >
              404
            </div>
          </div>

          {/* Subtitle with glitch */}
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-balance">Token Found. Or Maybe Not. 🤔</h1>
            <p className="text-xl text-purple-300 text-balance">
              Welcome to the <span className="text-pink-400 font-bold">x402 Resource Server</span>
            </p>
            <p className="text-lg text-cyan-300 font-mono">Pay first, ask questions later 💸</p>
          </div>

          {/* Status indicator */}
          <div
            className={`inline-block px-6 py-3 rounded-lg border-2 transition-all duration-300 ${
              authorized
                ? "border-green-500 bg-green-500/10 text-green-300"
                : "border-pink-500 bg-pink-500/10 text-pink-300"
            }`}
          >
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full animate-pulse ${authorized ? "bg-green-500" : "bg-pink-500"}`} />
              <span className="font-mono text-sm">{authorized ? "✓ AUTHORIZED" : "✗ PAYMENT REQUIRED"}</span>
            </div>
          </div>

          {/* Test buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              onClick={() => testEndpoint(false)}
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 disabled:opacity-50 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              {loading ? "Testing..." : "Test Without Token"}
            </button>
            <button
              onClick={() => testEndpoint(true)}
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-700 hover:to-cyan-600 disabled:opacity-50 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              {loading ? "Testing..." : "Test With Token (404)"}
            </button>
          </div>

          {/* Response display */}
          {response && (
            <div
              className={`mt-8 p-6 rounded-lg border-2 font-mono text-sm text-left overflow-auto max-h-64 ${
                response.authorized ? "border-green-500 bg-green-500/5" : "border-pink-500 bg-pink-500/5"
              }`}
            >
              <div className="text-xs text-gray-400 mb-2">HTTP {response.status}</div>
              <pre className="text-cyan-300 whitespace-pre-wrap break-words">
                {JSON.stringify(response.data || response.error, null, 2)}
              </pre>
            </div>
          )}

          {/* Info section */}
          <div className="mt-12 pt-8 border-t border-purple-500/30 space-y-4 text-left">
            <h2 className="text-xl font-bold text-pink-400">🎮 How It Works</h2>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex gap-2">
                <span className="text-cyan-400">→</span>
                <span>
                  Send request to <code className="bg-black/50 px-2 py-1 rounded text-cyan-300">/api/resource</code>
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400">→</span>
                <span>
                  Without token: Get{" "}
                  <code className="bg-black/50 px-2 py-1 rounded text-pink-300">HTTP 402 Payment Required</code>
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400">→</span>
                <span>
                  With header{" "}
                  <code className="bg-black/50 px-2 py-1 rounded text-cyan-300">x-resource-secret: 404</code>
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400">→</span>
                <span>
                  Get <code className="bg-black/50 px-2 py-1 rounded text-green-300">HTTP 200 OK</code> + meme access 🚀
                </span>
              </li>
            </ul>
          </div>

          {/* x402 badge */}
          <div className="mt-8 inline-block px-4 py-2 border border-purple-500/50 rounded-lg text-xs text-purple-300 font-mono">
            ✓ x402 Compliant Resource Server
          </div>
        </div>
      </div>
    </div>
  )
}
