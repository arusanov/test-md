import { visit } from 'unist-util-visit'

const clouds = [
    'aws',
    'azure',
    'gcp',
]


export function CloudPlugin() {
    /**
     * @param {import('mdast').Root} tree
     *   Tree.
     * @returns {undefined}
     *   Nothing.
     */
    return (tree) => {
        visit(tree, (node) => {
            if (
                node.type === 'containerDirective' || // block
                node.type === 'leafDirective' ||
                node.type === 'textDirective' // inline 
            ) {
                if (!clouds.includes(node.name)) return

                const data = node.data || (node.data = {})
                data.hName = 'cloud'
                data.hProperties = { ...node.attributes, cloud: node.name }
            }
        })
    }
}

export function CloudComponent({ cloud, children }) {
    if (cloud !== 'aws') return null
    return children
}