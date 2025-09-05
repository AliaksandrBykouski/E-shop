// create-styles.mjs
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const componentName = process.argv[2]

if (!componentName) {
  console.error('❌ Укажи имя компонента для стилей.')
  process.exit(1)
}

const baseDir = path.resolve(__dirname, 'styles', componentName)

if (fs.existsSync(baseDir)) {
  console.error('❌ Стили для такого компонента уже существуют!')
  process.exit(1)
}

fs.mkdirSync(baseDir, { recursive: true })

// index.module.scss
const scssCode = `.${componentName.toLowerCase()} {
  margin: 0;
}
`

fs.writeFileSync(path.join(baseDir, 'index.module.scss'), scssCode)

console.info(`✅ Стили для ${componentName} созданы в ${baseDir}`)
