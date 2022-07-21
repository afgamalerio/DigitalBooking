import React from "react";
import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import BookingCalendar from "../components/BookingCalendar";

test("render content", () => {
    const component = <BookingCalendar />;

    render(component);
    
})