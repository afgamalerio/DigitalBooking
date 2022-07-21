import React from "react";
import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import Drawer from "../components/Drawer";

test("render content", () => {
    const component = <Drawer />;

    render(component);
})