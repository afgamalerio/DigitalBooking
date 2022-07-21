import React from "react";
import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import Calendar from "../components/Calendar";

test("render content", () => {
    const component = <Calendar />;

    render(component);
})