import React from "react";
import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import ProductGallery from "../components/ProductGallery";

test("render content", () => {
    const component = <ProductGallery />;

    render(component);
})