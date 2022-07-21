import React from "react";
import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import ProductCalendar from "../components/ProductCalendar";

test("render content", () => {
    const component = <ProductCalendar />;

    render(component);
})