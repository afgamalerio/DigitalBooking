import React from "react";
import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import ProductLocation from "../components/ProductLocation";

test("render content", () => {
    const component = <ProductLocation />;

    render(component);
})