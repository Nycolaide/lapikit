# @Lapikit/repl

@lapikit/repl is a Svelte component for Lapikit. It's a add-on package for Lapikit library.


## Installation

```bash
npm install -D @lapikit/repl
```


```javascript
// svelte.config.js

import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: [vitePreprocess(), lapikitPreprocess({ plugins: ['repl'] })],

	...
};

export default config;
```

## Usage

```svelte
<kit:repl content="console.log('hello')" />
```


```svelte
<script lang="ts">
	import sampleCounter from './samples/counter.svelte?raw';
	import Counter from './samples/counter.svelte';
</script>

<kit:repl presentation content={sampleCounter}>
	<Counter />
</kit:repl>
```


```svelte
<script lang="ts">
	import sampleJson from './samples/json.json?raw';
	import sampleCounter from './samples/counter.svelte?raw';
	import sampleCss from './samples/css.css?raw';
	import Counter from './samples/counter.svelte';
</script>

<kit:repl
	presentation
	content={{
		'Counter.svelte': { code: sampleCounter, lang: 'svelte' },
		'file.json': { code: sampleJson, lang: 'json' },
		'Styles.css': { code: sampleCss, lang: 'css' },
	}}
>
	<Counter />
</kit:repl>
```


```svelte
<script lang="ts">
	import sampleJson from './samples/json.json?raw';
	import sampleCounter from './samples/counter.svelte?raw';
	import sampleCss from './samples/css.css?raw';
	import Counter from './samples/counter.svelte';
</script>

<kit:repl
	content={{
		'Counter.svelte': { code: sampleCounter, lang: 'svelte' },
		'file.json': { code: sampleJson, lang: 'json' },
		'Styles.css': { code: sampleCss, lang: 'css' },
	}}
>
	<Counter />
</kit:repl>
```


## Props

| Prop        | Type                        | Default   | Description                                                  |
| ----------- | --------------------------- | --------- | ------------------------------------------------------------ |
| content     | string \| Record<string, { code: string; lang?: string }> | ''        | The code content to be displayed in the REPL. It can be a single string or an object representing multiple files. |
| presentation | boolean                     | false     | If true, the REPL will be in presentation mode, showing only the output without the code editor. |
| tiltle | string                      | ''    | The title displayed on the REPL toolbar.                     |