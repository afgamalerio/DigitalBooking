package com.example.proyectoIntegradorG1.repository;

import com.example.proyectoIntegradorG1.model.Feature;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IFeatureRepository extends JpaRepository<Feature,Long> {
}
