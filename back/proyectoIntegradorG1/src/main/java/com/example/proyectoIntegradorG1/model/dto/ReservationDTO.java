package com.example.proyectoIntegradorG1.model.dto;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class ReservationDTO {
    private Long Id;
    private String startHour;
    private String startDate;
    private String finishDate;
    private String comments;
    private int vaccinated;
    private ProductIdDTO product;
    private UserIdDTO user;
}
