import React from "react";
import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import HeaderButtons from "../components/HeaderButtons";

test("render content", () => {
    const component = <HeaderButtons />;

    render(component);
})