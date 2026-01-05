import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputDir = path.join(__dirname, '../static/images/original');
const outputDir = path.join(__dirname, '../static/images');

// Tailles pour mobile, desktop, retina
const sizes = [
	{ width: 320, suffix: '-mobile' },
	{ width: 700, suffix: '-desktop' },
	{ width: 1400, suffix: '-2x' }
];

async function optimizeImages() {
	try {
		// Créer le dossier de sortie s'il n'existe pas
		await mkdir(outputDir, { recursive: true });

		console.log('🖼️  Optimisation des images...\n');

		// Lire tous les fichiers du dossier original
		const files = await readdir(inputDir);

		for (const file of files) {
			// Vérifier que c'est une image
			if (!/\.(jpg|jpeg|png|webp)$/i.test(file)) continue;

			const inputPath = path.join(inputDir, file);
			const name = path.parse(file).name;

			console.log(`📸 Processing: ${file}`);

			// Générer toutes les tailles
			for (const { width, suffix } of sizes) {
				// WebP
				const webpOutput = path.join(outputDir, `${name}${suffix}.webp`);
				await sharp(inputPath)
					.resize(width, null, { withoutEnlargement: true })
					.webp({ quality: 85 })
					.toFile(webpOutput);

				console.log(`  ✅ ${name}${suffix}.webp (${width}px)`);
			}

			// Aussi créer une version standard (pour fallback)
			const standardOutput = path.join(outputDir, `${name}.jpg`);
			await sharp(inputPath)
				.resize(700, null, { withoutEnlargement: true })
				.jpeg({ quality: 85 })
				.toFile(standardOutput);

			console.log(`  ✅ ${name}.jpg (standard)\n`);
		}

		console.log('✨ Optimisation terminée !');
	} catch (error) {
		console.error('❌ Erreur:', error);
		process.exit(1);
	}
}

optimizeImages();
