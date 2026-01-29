import { liliCore } from './src/lib/labs/compiler/preprocess/lili.ts';

const input = '<div title="<kit:btn />"><kit:btn /></div>';
const result = liliCore().markup({ content: input });

console.log('Result:', result);
console.log('Code:', result?.code);
