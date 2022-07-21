import React from "react";
import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import Rating from "../components/Rating";

test("render content", () => {
    const component = <Rating />;

    render(component);
})