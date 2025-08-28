// create-component.mjs
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const componentName = process.argv[2]

if (!componentName) {
  console.error('❌ Укажи имя компонента.')
  process.exit(1)
}

// функция для перевода CamelCase → kebab-case
function toKebabCase(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase()
}

const kebabName = toKebabCase(componentName)

const baseDir = path.resolve(__dirname, 'create', componentName)

if (fs.existsSync(baseDir)) {
  console.error('❌ Такой компонент уже существует.')
  process.exit(1)
}

fs.mkdirSync(baseDir, { recursive: true })

// Код компонента
const tsxCode = `import styles from '@/styles/${kebabName}/index.module.scss'

const ${componentName} = () => {
  return (
    <div className={styles.${kebabName}}>
      <h1>${componentName}</h1>
    </div>
  )
}
export default ${componentName}
`

fs.writeFileSync(path.join(baseDir, `${componentName}.tsx`), tsxCode)

console.info(`✅ Компонент ${componentName} создан в папке ${baseDir}`)
