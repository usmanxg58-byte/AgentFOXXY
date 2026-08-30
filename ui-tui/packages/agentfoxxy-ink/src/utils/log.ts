export function logError(error: unknown): void {
  if (!process.env.AGENTFOXXY_INK_DEBUG_ERRORS) {
    return
  }

  console.error(error)
}
