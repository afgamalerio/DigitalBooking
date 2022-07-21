import React from "react";
import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import Footer from "../components/Footer";

test("render content", () => {
    const component = <Footer />;

    render(component);
})