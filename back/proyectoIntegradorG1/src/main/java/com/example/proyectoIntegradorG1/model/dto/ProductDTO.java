package com.example.proyectoIntegradorG1.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class ProductDTO {

    private Long id;
    private String name;
    private String title_description;
    private String description;
    private int rating;
    private double latitude;
    private double longitude;
    private CategoryDTO category;
    private CityDTO city;
    private List<ImageDTO> images;
    private List<FeatureDTO> features;
    private PoliciesDTO policies;
    private List<ReservationDisabledDTO> reservations;

}
