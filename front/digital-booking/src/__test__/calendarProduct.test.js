import React from "react";
import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import CalendarProduct from "../components/CalendarProduct";

test("render content", () => {
    const component = <CalendarProduct />;

    render(component);
})