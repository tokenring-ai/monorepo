#!/usr/bin/env bun
import fs from 'fs/promises';
import {glob} from 'glob';
import path from 'path';


const baseDir = path.resolve(import.meta.dir, "../")
// Configuration
const sourceDir = `${baseDir}/scripts/boilerplate`;
const targetPatterns = ['pkg/*', 'app/*', 'frontend/*'];

async function main(): Promise<void> {
  try {
    // Get the list of boilerplate files
    const files = await glob("*", { cwd: sourceDir, absolute: false });
    
    console.log(`Found ${files.length} boilerplate files to sync.\n`);

    // Process each pattern
    for (const pattern of targetPatterns) {
      // Use glob to expand the directories (e.g., pkg/*)
      const dirs = await glob(pattern, {cwd: baseDir, absolute: true, nodir: false});

      for (const packageDir of dirs) {
        try {
          const stats = await fs.stat(packageDir);
          if (!stats.isDirectory()) {
            continue;
          }

          console.log(`Processing package: ${packageDir}`);

          // Copy each file to the package directory
          for (const file of files) {
            const src = path.join(sourceDir, file);
            const dst = path.join(packageDir, file);

            try {
              await fs.copyFile(src, dst);
              console.log(`  -> Copied ${file}`);
            } catch (err) {
              console.error(`  [!] Failed to copy ${file} to ${packageDir}:`, err);
            }
          }

          // Handle package.json modifications
          const packageJsonPath = path.join(packageDir, 'package.json');
          try {
            const packageJsonContent = await fs.readFile(packageJsonPath, 'utf-8');
            const packageData = JSON.parse(packageJsonContent);

            let modified = false;
            // Initialize devDependencies if it doesn't exist
            if (!packageData.devDependencies) {
              packageData.devDependencies ??= {};
            }
            if (!packageData.scripts) {
              packageData.scripts ??= {};
            }


            // Add vitest to devDependencies
            if (packageData.devDependencies.vitest != 'catalog:') {
              modified = true;
              packageData.devDependencies.vitest = 'catalog:';
            }

            if (packageData.scripts.test != 'vitest run') {
              modified = true;
              packageData.scripts.test = 'vitest run';
            }

            if (packageData.scripts['test:watch'] != 'vitest') {
              modified = true;
              packageData.scripts['test:watch'] = 'vitest';
            }

            if (packageData.scripts['test:coverage'] != 'vitest run --coverage') {
              modified = true;
              packageData.scripts['test:coverage'] = 'vitest run --coverage';
            }

            if (packageData.devDependencies.typescript != 'catalog:') {
              modified = true;
              packageData.devDependencies.typescript = 'catalog:';
            }

            if (packageData.scripts.build != 'tsc --noEmit') {
              modified = true;
              packageData.scripts.build = 'tsc --noEmit';
            }

            if (! packageData.license) {
              modified = true;
              packageData.license = 'MIT';
            }

            if (! packageData.type) {
              modified = true;
              packageData.type = 'module';
            }

            if (! packageData.exports) {
              modified = true;
              packageData.exports = {};
            }

            if (! packageData.exports["."]) {
              modified = true;
              packageData.exports["."] = "./index.ts";
            }

            if (! packageData.exports["./*"]) {
              modified = true;
              packageData.exports["./*"] = "./*.ts";
            }

            if (modified) {
              // Write the updated package.json back
              await fs.writeFile(packageJsonPath, JSON.stringify(packageData, null, 2));
              console.log(`  -> Updated package.json`);
            }
          } catch (err) {
            console.error(`  [!] Failed to update package.json in ${packageDir}:`, err);
          }

          console.log('');
        } catch (err) {
          console.error(`Error processing directory ${packageDir}:`, err);
        }
      }
    }

    console.log('Done!');
  } catch (err) {
    console.error('Fatal error:', err);
    process.exit(1);
  }
}

main();