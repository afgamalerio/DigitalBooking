package com.example.proyectoIntegradorG1.repository;

import com.example.proyectoIntegradorG1.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IImageRepository extends JpaRepository<Image, Long> {
}