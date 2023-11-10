import { visit } from 'unist-util-visit'

const replacements = {
    "DB": "a SQL Database",
    "Customer": "a beloved Customer",
}

const replacementRegex = new RegExp(`\\[(${Object.keys(replacements).join('|')})\\]`, 'g');

export function ReplacementPlugin() {
    /**
     * @param {import('mdast').Root} tree
     *   Tree.
     * @returns {undefined}
     *   Nothing.
     */
    return (tree, file) => {
        visit(tree, (node) => {
            if (node.type === 'text' && node.value) {
                node.value = node.value.replace(replacementRegex, (match, p1) => {
                    return replacements[p1];
                })
            }
            if (
                node.type === 'textDirective' // inline 
            ) {
                if (node.name === "replace") {
                    const textNode = node.children[0];
                    if (textNode.type !== 'text') return
                    if (replacements[textNode.value] === undefined) {
                        const error = new Error(`No replacement with '${textNode.value}' exists`);
                        // Including positional information if available
                        if (node.position) {
                            error.position = node.position;
                            error.message += ` at ${node.position.start.line}:${node.position.start.column}`;
                        }

                        // Use file.fail for a fatal error, which typically stops the process
                        // file.fail(error.message, node.position);

                        // Use file.message for a non-fatal error, which allows the process to continue
                        file.fail(error.message, node.position);
                    }
                    textNode.value = replacements[textNode.value]
                }
            }
        })
    }
}

