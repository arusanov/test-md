import Editor from '@monaco-editor/react';
import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


export function DemoStand(props) {
    const { tabs, values, onChange, errors = [], content } = props;

    return (
        <main>
            <div style={{ display: 'flex', flexBasis: '50%' }}>
                <Tabs style={{ width: '100%' }}>
                    <TabList>
                        {tabs.map((label) => (<Tab key={label}>{label}</Tab>))}
                    </TabList>
                    {values.map(({ language = 'json', value = '', readOnly = false }) => (<TabPanel>
                        <Editor height="90vh" defaultLanguage="markdown" defaultValue={value} defaultPath='example.markdoc' onChange={onChange} options={{ readOnly }} />
                    </TabPanel>))}
                </Tabs>
                <div style={{ padding: '10px', borderLeft: 'solid 2px #444', height: '100vh', overflow: 'scroll', width: '100%' }}>
                    {errors.length > 0 && <pre style={{ background: '#fa8e8e', color: '#fff', border: 'solid 2px #f00', padding: 10 }}>
                        Errors:<br />
                        {JSON.stringify(errors, undefined, ' ')}
                    </pre>
                    }
                    {content}
                </div>
            </div>
        </main >
    );
}
