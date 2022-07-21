package com.example.proyectoIntegradorG1.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class ProductCreateDTO {

    private Long id;
    private String name;
    private String title_description;
    private String description;
    private int rating;
    private double latitude;
    private double longitude;
    private CategoryIdDTO category;
    private CityIdDTO city;
    private List<ImageIdDTO> images;
    private List<FeatureIdDTO> features;
    private PoliciesDTO policies;
}
