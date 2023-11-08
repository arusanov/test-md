import React from 'react';
import { Tab as ReactTab, Tabs as ReactTabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Children } from 'react';
export function Tabs({ labels, children }) {
    return (
        <ReactTabs>
            <TabList>
                {labels.map((label) => (<ReactTab key={label}>{label}</ReactTab>))}
            </TabList>
            {Children.map(children, (child, index) => (<TabPanel>{child}</TabPanel>))}
        </ReactTabs>
    );
}

export function Tab({ children }) {
    return children
}