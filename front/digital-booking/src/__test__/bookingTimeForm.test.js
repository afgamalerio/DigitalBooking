import React from "react";
import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import BookingTimeForm from "../components/BookingTimeForm";

test("render content", () => {
    const component = <BookingTimeForm />;

    render(component);
})