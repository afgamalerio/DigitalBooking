import React from "react";
import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import List from "../components/List";

test("render content", () => {
    const component = <List />;

    render(component);
})