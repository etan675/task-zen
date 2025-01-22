import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// SCRIPT THAT COPIES THE STATIC FILES INTO THE BUILD DIR

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const publicDir = path.join(__dirname, 'src', 'public');
const viewsDir = path.join(__dirname, 'src', 'views');
const destPublicDir = path.join(__dirname, 'build', 'public');
const destViewsDir = path.join(__dirname, 'build', 'views');

const copyFolder = async (src, dest) => {
    // ensure the destination folder exists
    await fs.promises.mkdir(dest, { recursive: true });

    // read source folder
    const dirEnts = await fs.promises.readdir(src, { withFileTypes: true });
    
    for (const dirEnt of dirEnts) {
        const file = dirEnt.name;

        const srcPath = path.join(src, file);
        const destPath = path.join(dest, file);

        const stats = await fs.promises.stat(srcPath);

        if (stats.isDirectory()) {
            // if dir, recursively copy
            await copyFolder(srcPath, destPath);
        } else {
            // if file, copy
            await fs.promises.copyFile(srcPath, destPath);
        }
    }
}

await copyFolder(publicDir, destPublicDir);
await copyFolder(viewsDir, destViewsDir);
