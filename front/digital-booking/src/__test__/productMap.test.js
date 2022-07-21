import React from "react";
import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import ProductMap from "../components/ProductMap";

test("render content", () => {
    const component = <ProductMap />;

    render(component);
})