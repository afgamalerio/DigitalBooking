import React from "react";
import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import Icon from "../components/Icon";

test("render content", () => {
    const component = <Icon />;

    render(component);
})