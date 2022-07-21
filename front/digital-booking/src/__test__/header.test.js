import React from "react";
import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import Header from "../components/Header";

test("render content", () => {
    const component = <Header />;

    render(component);
})