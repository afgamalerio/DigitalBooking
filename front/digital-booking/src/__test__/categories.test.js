import React from "react";
import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import Categories from "../components/Categories";

test("render content", () => {
    const component = <Categories />;

    render(component);
})