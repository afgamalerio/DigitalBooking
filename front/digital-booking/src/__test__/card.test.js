import React from "react";
import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import Card from "../components/Card";

test("render content", () => {
    const component = <Card />;

    render(component);
})