import React from "react";
import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import HeaderAvatar from "../components/HeaderAvatar";

test("render content", () => {
    const component = <HeaderAvatar />;

    render(component);
})