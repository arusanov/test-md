import { useEffect, useState } from 'react';
import example from './content/example.markdoc?raw';
import Editor from '@monaco-editor/react';
import Markdoc from '@markdoc/markdoc'
import React from 'react';
import schemaConfig from './schema';
import components from './blocks';
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';



export function MarkdocDemo() {
    const [value, setValue] = useState(example);
    const [ast, setAst] = useState({});
    const [renderTree, setRenderTree] = useState({});
    const [errors, setErrors] = useState([]);
    const [reactTree, setReactTree] = useState(undefined);

    useEffect(() => {
        const ast = Markdoc.parse(value);
        const errors = Markdoc.validate(ast, schemaConfig);
        const transform = Markdoc.transform(ast, schemaConfig);
        const reactTree = Markdoc.renderers.react(transform, React, { components })
        setAst(ast);
        setRenderTree(transform);
        setErrors(errors);
        setReactTree(reactTree);
    }, [value])
    return (
        <main>
            <div style={{ display: 'flex', flexBasis: '50%' }}>
                <Tabs style={{ width: '100%' }}>
                    <TabList>
                        <Tab>Markdoc</Tab>
                        <Tab>AST</Tab>
                        <Tab>Render AST</Tab>
                    </TabList>
                    <TabPanel>
                        <Editor height="90vh" defaultLanguage="markdown" defaultValue={value} defaultPath='example.markdoc' onChange={(value) => setValue(value)} />
                    </TabPanel>
                    <TabPanel>
                        <Editor height="90vh" defaultLanguage="json" value={JSON.stringify(ast, undefined, ' ')} defaultPath='parsed tree' options={{ readOnly: true }} />
                    </TabPanel>
                    <TabPanel>
                        <Editor height="90vh" defaultLanguage="json" value={JSON.stringify(renderTree, undefined, ' ')} defaultPath='render tree' options={{ readOnly: true }} />
                    </TabPanel>
                </Tabs>
                <div style={{ padding: '10px', borderLeft: 'solid 2px #444', height: '100vh', overflow: 'scroll', width: '100%' }}>
                    {errors.length > 0 && <pre style={{ background: '#fa8e8e', color: '#fff', border: 'solid 2px #f00', padding: 10 }}>
                        Errors:<br />
                        {JSON.stringify(errors, undefined, ' ')}
                    </pre>
                    }
                    {reactTree}
                </div>
            </div>
        </main>
    );
}
