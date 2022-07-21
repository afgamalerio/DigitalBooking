import React from "react";
import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import GalleryModal from "../components/GalleryModal";

test("render content", () => {
    const component = <GalleryModal />;

    render(component);
})