import React from "react";
import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import AdminProductHeader from "../components/AdminProductHeader";

test("render content", () => {
    const component = <AdminProductHeader />;

    render(component);
})