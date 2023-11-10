import { visit } from 'unist-util-visit'
import css from './callout.module.css'

const calloutTypes = [
    'callout',
    'info',
    'tip',
    'note',
    'warning',
    'danger',
]


export function CalloutPlugin() {
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
                if (!calloutTypes.includes(node.name)) return

                const data = node.data || (node.data = {})
                data.hName = 'callout'
                data.hProperties = { ...node.attributes, type: node.name }
            }
        })
    }
}

export function CalloutComponent({ type, children, title }) {
    return <div className={`${css.callout} ${css[type]}`}>
        {title && <h3>{title}</h3>}
        {children}
    </div>
}