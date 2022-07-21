import React from "react";
import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import ProductHeader from "../components/ProductHeader";

test("render content", () => {
    const component = <ProductHeader />;

    render(component);
})