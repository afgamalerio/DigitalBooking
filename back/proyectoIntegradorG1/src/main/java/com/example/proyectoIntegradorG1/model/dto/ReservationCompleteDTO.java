package com.example.proyectoIntegradorG1.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class ReservationCompleteDTO {
    private Long Id;
    private String startHour;
    private String startDate;
    private String finishDate;
    private String comments;
    private int vaccinated;
    private ProductDTO product;
    private UserIdDTO user;
}
