import * as esbuild from 'esbuild'

const path = './src/functions';
const distPath = './dist'
await esbuild.build({
    entryPoints: [`./serverless.ts`],
    bundle: true,
    // tsconfig: 'custom-tsconfig.json',
    platform: 'node',
    outfile: `./dist/serverless.js`,
})

await esbuild.build({
    entryPoints: [`${path}/handler.ts`],
    bundle: true,
    // tsconfig: 'custom-tsconfig.json',
    platform: 'node',
    minify:true,
    outfile: `${distPath}/handler.js`,})



