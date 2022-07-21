package com.example.proyectoIntegradorG1.service;

import com.example.proyectoIntegradorG1.model.Category;
import com.example.proyectoIntegradorG1.model.City;
import com.example.proyectoIntegradorG1.model.Product;
import com.example.proyectoIntegradorG1.model.dto.CityDTO;
import com.example.proyectoIntegradorG1.model.dto.ProductDTO;
import com.example.proyectoIntegradorG1.repository.ICityRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service("CityService")
public class CityService implements IService<CityDTO>{

    ICityRepository repository;
    ObjectMapper mapper;
    ModelMapper modelMapper;

    @Autowired
    public CityService(ICityRepository repository, ObjectMapper mapper, ModelMapper modelMapper) {
        this.repository = repository;
        this.mapper = mapper;
        this.modelMapper = modelMapper;
    }

    @Override
    public CityDTO save(CityDTO cityDTO) {
        City city = mapper.convertValue(cityDTO, City.class);
        return mapper.convertValue(repository.save(city), CityDTO.class);
    }

    @Override
    public CityDTO findById(Long id) {
        return mapper.convertValue(repository.findById(id), CityDTO.class);
    }

    @Override
    public List<CityDTO> findAll() {
        Collection<City> cities = repository.findAll();
        return modelMapper.map(cities, new TypeToken<List<CityDTO>>() {}.getType());
    }

    @Override
    public Boolean delete(Long id) {
        if(findById(id)!=null){
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public CityDTO update(CityDTO cityDTO) {

        if (findById(cityDTO.getId())!=null){
            return save(cityDTO);
        }
        return null;
    }

    /**Buscar productos de esa ciudad**/
    public List<ProductDTO> findProductsByCityId(Long id) {

        City city = repository.getById(id);
        Collection<Product> products = city.getProducts();

        return modelMapper.map(products,
                new TypeToken<List<ProductDTO>>() {}.getType());
    }
}
