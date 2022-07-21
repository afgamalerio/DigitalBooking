package com.example.proyectoIntegradorG1.service;

import com.example.proyectoIntegradorG1.model.dto.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IServiceProduct {

        public ProductCreateDTO save(ProductCreateDTO productDTO);
        public ProductDTO findById(Long id);
        public List<ProductDTO> findAll();
        public Boolean delete(Long id);
        public ProductCreateDTO update(ProductCreateDTO productDTO);
        public Page<ProductDTO> findAllByCategory(Long category_id,
                                                  Pageable pageable);
        public Page<ProductDTO> findAllByCity(Long city_id, Pageable pageable);
        public Page<ProductDTO> findAllByRating(Pageable pageable);
        public Page<ProductDTO> findAllByCityandDates (Long city,
                                                       String startDate,
                                                       String finishDate,
                                                       Pageable pageable);
        public Page<ProductDTO> findAllByDates (String startDate,
                                                String finishDate,
                                                Pageable pageable);
        public Page<ProductDTO> findAllPageable(Pageable pageable);
        public Page<ProductDTO> findAllByRatingPageable(Pageable pageable);

}
