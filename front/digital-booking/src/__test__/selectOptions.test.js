import React from "react";
import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import SelectOptions from "../components/SelectOptions";

test("render content", () => {
    const component = <SelectOptions />;

    render(component);
})