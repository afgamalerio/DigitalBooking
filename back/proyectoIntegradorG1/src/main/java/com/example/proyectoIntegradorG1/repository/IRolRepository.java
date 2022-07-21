package com.example.proyectoIntegradorG1.repository;

import com.example.proyectoIntegradorG1.model.Rol;
import com.example.proyectoIntegradorG1.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IRolRepository extends JpaRepository<Rol, Long> {

    //Query Listar Rol por Nombre
    @Query("from Rol r where r.name = :name")
    Optional<Rol> getRolByName (@Param("name") String name);
}
