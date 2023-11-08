import { nodes } from '@markdoc/markdoc';

const replacements = {
    "DB": "a SQL Database",
    "Customer": "a beloved Customer",
}

const replacementRegex = new RegExp(`<(${Object.keys(replacements).join('|')})>`, 'g');

/** @type {import('@markdoc/markdoc').Schema} */
export const subs = {
    render: 'Substitution',
    children: [],
    selfClosing: true,
    attributes: {
        val: {
            type: String,
            errorLevel: 'critical'
        },
    },
    validate: (node) => {
        const val = node.attributes.val;
        if (!Object.keys(replacements).includes(val)) {
            return [{
                id: 'invalid-substitution',
                level: 'critical',
                message: `invalid substitution: ${val}`,
            }]
        }
        return [];
    },
    transform: (node) => {
        return replacements[node.attributes.val];
    }
};

/** @type {import('@markdoc/markdoc').Schema} */
export const text = {
    ...nodes.text,
    transform(node) {
        return node.attributes.content.replace(replacementRegex, (match, p1) => {
            return replacements[p1];
        });
    },
}