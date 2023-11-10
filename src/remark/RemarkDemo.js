import { useEffect, useState } from "react";
import example from "./content/example.mdx?raw";
import React from "react";
import "react-tabs/style/react-tabs.css";
import { DemoStand } from "../DemoStand";
import { processMarkdown } from "./processMarkdown";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { MDXProvider } from "@mdx-js/react";
import { CalloutPlugin, CalloutComponent } from "./blocks/Callout.remark";
import { CloudComponent, CloudPlugin } from "./blocks/Cloud.remark";
import { ReplacementPlugin } from "./blocks/replacements.remark";

const remarkPlugins = [
    [ReplacementPlugin],
    [CalloutPlugin],
    [CloudPlugin],
]

/**
 * @param {string} markdown 
 */
function useDemo(markdown) {
    const [data, setData] = useState({});
    useEffect(
        function () {
            processMarkdown(markdown, { remarkPlugins }).then(
                function (data) {
                    setData(data);
                },
                function (error) {
                    setData({ errors: [error.toString()] });
                }
            )
        },
        [
            markdown
        ]
    )
    return data;
}

const components = {
    h1: function CustomHeading(props) {
        return <h1 style={{ color: 'red' }}>Custom {props.children}</h1>
    },
    Tab, Tabs, TabList, TabPanel,
    callout: CalloutComponent,
    Callout: CalloutComponent,
    cloud: CloudComponent,
    AWS: (props) => <CloudComponent cloud="aws" {...props} />,
    Azure: (props) => <CloudComponent cloud="azure" {...props} />
}

export function RemarkDemo() {
    const [value, setValue] = useState(example);
    const { esAST,
        hAST,
        mdAST,
        file,
        render,
        errors = []
    } = useDemo(value);
    return (<MDXProvider components={components}>
        <DemoStand
            tabs={["MDX", "JS code", "mdAST", "hAST", "esAST"]}
            onChange={(value) => setValue(value)}
            values={[
                {
                    language: "markdown",
                    value: value,
                },
                {
                    language: "js",
                    value: file?.toString(),
                    readOnly: true,
                },
                {
                    language: "mdAST",
                    value: JSON.stringify(mdAST, undefined, " "),
                    readOnly: true,
                },
                {
                    language: "hAST",
                    value: JSON.stringify(hAST, undefined, " "),
                    readOnly: true,
                },
                {
                    language: "esAST",
                    value: JSON.stringify(esAST, undefined, " "),
                    readOnly: true,
                },
            ]}
            content={() => render?.default?.()}
            errors={errors}
        />
    </MDXProvider>
    );
}
