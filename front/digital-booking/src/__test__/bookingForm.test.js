import React from "react";
import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import BookingForm from "../components/BookingForm";

test("render content", () => {
    const component = <BookingForm />;

    render(component);
})