import React from "react";
import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import BookingDetails from "../components/BookingDetails";

test("render content", () => {
    const component = <BookingDetails />;

    render(component);
})