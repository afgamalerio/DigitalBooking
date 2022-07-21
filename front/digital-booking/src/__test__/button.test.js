import React from "react";
import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import Button from "../components/Button";

test("render content", () => {
    const component = <Button />;

    render(component);
})