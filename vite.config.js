import fs from 'node:fs'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

function caseSensitivePaths() {
  return {
    name: 'case-sensitive-paths',
    resolveId(source, importer) {
      if (!importer || (!source.startsWith('.') && !path.isAbsolute(source))) {
        return
      }

      const requestedPath = path.resolve(path.dirname(importer), source)
      let currentPath = path.parse(requestedPath).root

      for (const segment of path.relative(currentPath, requestedPath).split(path.sep)) {
        if (!segment) continue

        const nextPath = path.join(currentPath, segment)
        const entries = fs.readdirSync(currentPath)
        const actualName = entries.find((name) => name === segment)
        if (!actualName) {
          const caseInsensitiveMatch = entries.find(
            (name) => name.toLowerCase() === segment.toLowerCase(),
          )

          if (!caseInsensitiveMatch) break

          throw new Error(
            `Import path "${source}" has incorrect casing. Use "${caseInsensitiveMatch}" instead.`,
          )
        }

        currentPath = nextPath
      }
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [caseSensitivePaths(), react()],
  base: '/forecast/',
  server: {
    watch: {
      usePolling: true
    }
  }
})
