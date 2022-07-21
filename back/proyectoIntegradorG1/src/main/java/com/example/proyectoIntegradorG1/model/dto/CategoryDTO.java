package com.example.proyectoIntegradorG1.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class CategoryDTO {

    private Long id;
    private String title;
    private String description;
    private String img;

}
