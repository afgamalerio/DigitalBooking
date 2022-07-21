import React from "react";
import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import ProductDescription from "../components/ProductDescription";

test("render content", () => {
    const component = <ProductDescription />;

    render(component);
})