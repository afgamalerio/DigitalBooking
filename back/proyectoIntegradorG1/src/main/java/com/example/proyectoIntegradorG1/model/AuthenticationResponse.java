package com.example.proyectoIntegradorG1.model;

import com.example.proyectoIntegradorG1.model.dto.RolDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;


@Getter
public class AuthenticationResponse {

    private final String jwt;
    private final String name;
    private final String lastname;
    private final Long id;
    private final Rol rol;
    private final Collection<? extends GrantedAuthority> authorities;

    public AuthenticationResponse(String jwt, String name,
                                  String lastname, Long id, Rol rol, Collection<? extends GrantedAuthority> authorities){
        this.jwt = jwt;
        this.name = name;
        this.lastname = lastname;
        this.id = id;
        this.rol = rol;
        this.authorities = authorities;
    }

}
