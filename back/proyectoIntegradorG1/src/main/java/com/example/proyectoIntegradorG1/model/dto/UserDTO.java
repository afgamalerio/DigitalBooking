package com.example.proyectoIntegradorG1.model.dto;

import com.example.proyectoIntegradorG1.model.Rol;
import lombok.*;


@Getter
@Setter
@ToString
@NoArgsConstructor
public class UserDTO {

    private Long id;
    private String name;
    private String lastname;
    private String email;
    private RolDTO rol;
}
