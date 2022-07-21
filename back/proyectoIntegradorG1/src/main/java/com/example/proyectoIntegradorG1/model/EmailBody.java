package com.example.proyectoIntegradorG1.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter @Getter
@ToString
public class EmailBody {
    private String email;
    private String content;
    private String subject;

}
