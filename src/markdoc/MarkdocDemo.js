import { useEffect, useState } from "react";
import example from "./content/example.markdoc?raw";
import Markdoc from "@markdoc/markdoc";
import React from "react";
import schemaConfig from "./schema";
import components from "./blocks";
import "react-tabs/style/react-tabs.css";
import { DemoStand } from "../DemoStand";

export function MarkdocDemo() {
  const [value, setValue] = useState(example);
  const [data, setData] = useState({});
  const { ast, errors, renderTree, content } = data;

  useEffect(() => {
    const ast = Markdoc.parse(value);
    const errors = Markdoc.validate(ast, schemaConfig);
    const renderTree = Markdoc.transform(ast, schemaConfig);
    const content = Markdoc.renderers.react(renderTree, React, { components });
    setData({ ast, errors, renderTree, content });
  }, [value]);

  return (
    <DemoStand
      tabs={["Markdoc", "AST", "Render AST"]}
      onChange={(value) => setValue(value)}
      values={[
        {
          language: "markdown",
          value: example,
        },
        {
          language: "json",
          value: JSON.stringify(ast, undefined, " "),
          readOnly: true,
        },
        {
          language: "json",
          value: JSON.stringify(renderTree, undefined, " "),
          readOnly: true,
        },
      ]}
      content={content}
      errors={errors}
    />
  );
}
