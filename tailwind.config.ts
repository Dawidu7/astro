import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/app/**/*.tsx", "./src/components/**/*.tsx"],
  theme: {
    extend: {
      transitionDuration: {
        250: "250ms",
      },
    },
  },
  plugins: [],
}
export default config
