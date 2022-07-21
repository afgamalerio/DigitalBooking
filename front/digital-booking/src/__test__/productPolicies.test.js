import React from "react";
import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import ProductPolicies from "../components/ProductPolicies";

test("render content", () => {
    const component = <ProductPolicies />;

    render(component);
})