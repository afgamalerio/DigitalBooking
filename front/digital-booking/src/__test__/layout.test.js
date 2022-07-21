import React from "react";
import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import Layout from "../components/Layout";

test("render content", () => {
    const component = <Layout />;

    render(component);
})