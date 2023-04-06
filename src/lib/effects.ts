export interface EffectOptions {
  speed?: number
  iterations?: number
  onComplete?: () => void
}

export function hackerEffect(node: HTMLElement, options: EffectOptions) {
  const letters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|:<>?'
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const { speed = 30, iterations = 3, onComplete = () => {} } = options
  const starterText = node.innerText
  let iteration = 0
  const interval = setInterval(() => {
    node.innerText = starterText
      .split('')
      .map((_, index) => {
        if (index < iteration) {
          return starterText[index]
        }

        return letters[Math.floor(Math.random() * 26)]
      })
      .join('')
    if (iteration >= starterText.length) {
      clearInterval(interval)
      onComplete && onComplete()
    }
    iteration += 1 / iterations
  }, speed)

  return {
    destroy() {
      clearInterval(interval)
    }
  }
}
