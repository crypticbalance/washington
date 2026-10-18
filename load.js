
import { readdir } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const operationsPath = path.resolve("./Bot/Operations");

async function getOperationFiles(directory) {
    const entries = await readdir(directory, {
        withFileTypes: true
    });

    const files = [];

    for (const entry of entries) {
        const fullPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            files.push(...await getOperationFiles(fullPath));
        } else if (
            entry.isFile() &&
            entry.name.endsWith(".js")
        ) {
            files.push(fullPath);
        }
    }

    return files;
}

export default async function loadOperations(client) {
    const files = await getOperationFiles(operationsPath);
    const loadedOperations = [];

    for (const filePath of files) {
        try {
            const module = await import(pathToFileURL(filePath).href);

            for (const [name, operation] of Object.entries(module)) {
                if (
                    typeof operation !== "function" ||
                    operation.constructor.name !== "AsyncFunction"
                ) {
                    continue;
                }

                loadedOperations.push(name);

                try {
                    await operation(client);
                } catch (error) {
                    console.error(
                        `[Operations] Failed to execute ${name}:`,
                        error
                    );
                }
            }
        } catch (error) {
            console.error(
                `[Operations] Failed to import ${filePath}:`,
                error
            );
        }
    }

    if (loadedOperations.length > 0) {
        const names = loadedOperations.map(
            name => name.charAt(0).toUpperCase() + name.slice(1)
        );

        console.log(
            `Loaded ${loadedOperations.length} files: ${names.join(", ")}`
        );
    }
}


