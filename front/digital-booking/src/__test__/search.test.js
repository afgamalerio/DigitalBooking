import React from "react";
import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import Search from "../components/Search";

test("render content", () => {
    const component = <Search />;

    render(component);
})