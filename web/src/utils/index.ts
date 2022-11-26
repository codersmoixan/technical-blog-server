export function timeSleep(wait: number = 300) {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      resolve(true)
      clearTimeout(timer)
    }, wait)
  })
}
