import { compile, nodeTypes, run } from '@mdx-js/mdx'
import { Fragment, jsx, jsxs } from 'react/jsx-runtime'
import rehypeRaw from 'rehype-raw'
import remarkDirective from 'remark-directive'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import { VFile } from 'vfile'
import { useMDXComponents } from '@mdx-js/react'


const runtime = { Fragment, jsx, jsxs }

/**
 * 
 * @param {string} value 
 * @returns 
 */
export async function processMarkdown(value, { remarkPlugins: addRemarkPlugins = [], } = {}) {
    let errors = [];
    const recmaPlugins = [
        [captureEsast],
    ];
    const rehypePlugins = [
        //TODO: ???
        [rehypeRaw, { passThrough: nodeTypes }],
        [captureHast],
    ];
    const remarkPlugins = [
        remarkDirective,
        remarkFrontmatter,
        remarkGfm,
        ...addRemarkPlugins,
        [captureMdast],
    ];



    const file = new VFile({
        basename: 'example.mdx',
        value
    });

    let esAST;
    let hAST;
    let mdAST;



    function captureMdast() {
        /**
         * @param {MdastRoot} tree
         *   Tree.
         * @returns {undefined}
         *   Nothing.
         */
        return function (tree) {
            const clone = structuredClone(tree);
            mdAST = clone;
        };
    }

    function captureHast() {
        /**
         * @param {HastRoot} tree
         *   Tree.
         * @returns {undefined}
         *   Nothing.
         */
        return function (tree) {
            const clone = structuredClone(tree);
            hAST = clone;
        };
    }

    function captureEsast() {
        /**
         * @param {Program} tree
         *   Tree.
         * @returns {undefined}
         *   Nothing.
         */
        return function (tree) {
            const clone = structuredClone(tree);
            esAST = clone;
        };
    }


    const compiled = await compile(file, {
        development: false,
        jsx: false,
        outputFormat: 'function-body',
        recmaPlugins,
        rehypePlugins,
        remarkPlugins,
        format: 'mdx',
        providerImportSource: '@mdx-js/react'
    });

    let renderResult;
    try {
        const options = {
            ...runtime,
            baseUrl: window.location.href,
            useMDXComponents: useMDXComponents,
        }
        renderResult = await run(String(compiled), options)
    } catch (error) {
        errors.push(error.toString());
    }

    return {
        esAST,
        hAST,
        mdAST,
        file: compiled,
        render: renderResult,
        errors
    }
}


