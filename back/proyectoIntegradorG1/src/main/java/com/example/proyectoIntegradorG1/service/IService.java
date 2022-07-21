package com.example.proyectoIntegradorG1.service;

import org.springframework.stereotype.Service;

import java.util.List;

public interface IService<T> {


    T save(T t);
    T findById(Long id);
    List<T> findAll();
    Boolean delete(Long id);
    T update(T t);

}
