package com.example.proyectoIntegradorG1.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class ReservationDisabledDTO {

    private Long Id;
    private Date startHour;
    private Date startDate;
    private Date finishDate;

}
