import { callout } from './Callout.markdoc';
import { subs, text } from './Subs.markdoc';
import { tab, tabs } from './Tabs.markdoc'
import partial from '../content/partial.markdoc?raw';
import Markdoc from '@markdoc/markdoc'

/** @type {import('@markdoc/markdoc').Config} */
const config = {
    tags: {
        callout,
        subs,
        tabs,
        tab
    },
    nodes: {
        text // Override the basic node with our own
    },
    variables: {
        cloud: "aws",
        isAws: true
    },
    partials: {
        'partial.markdoc': Markdoc.parse(partial)
    }
};


export default config;