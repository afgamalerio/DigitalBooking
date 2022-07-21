package com.example.proyectoIntegradorG1.service;

import com.example.proyectoIntegradorG1.model.Category;
import com.example.proyectoIntegradorG1.model.Product;
import com.example.proyectoIntegradorG1.model.dto.CategoryDTO;
import com.example.proyectoIntegradorG1.model.dto.ProductDTO;
import com.example.proyectoIntegradorG1.repository.ICategoryRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service("CategoryService")
public class CategoryService implements IService<CategoryDTO>{

    ICategoryRepository repository;
    ObjectMapper mapper;
    ModelMapper modelMapper;

    @Autowired
    public CategoryService(ICategoryRepository repository, ObjectMapper mapper, ModelMapper modelMapper) {
        this.repository = repository;
        this.mapper = mapper;
        this.modelMapper = modelMapper;
    }

    @Override
    public CategoryDTO save(CategoryDTO categoryDTO) {
        Category category = mapper.convertValue(categoryDTO,
                Category.class);
        return mapper.convertValue(repository.save(category),
                CategoryDTO.class);
    }

    @Override
    public CategoryDTO findById(Long id) {
        return mapper.convertValue(repository.findById(id), CategoryDTO.class);
    }

    @Override
    public List<CategoryDTO> findAll() {
        Collection<Category> categories = repository.findAll();
        return modelMapper.map(categories,
                new TypeToken<List<CategoryDTO>>() {}.getType());
    }

    @Override
    public Boolean delete(Long id) {

        if(findById(id)!=null){
            //Si el id existe lo elimina y devuelve true
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public CategoryDTO update(CategoryDTO categoryDTO) {

        if(findById(categoryDTO.getId())!= null){
            return save(categoryDTO);
        }

        return null;
    }

    /**Buscar productos de esa categoría**/
    public List<ProductDTO> findProductsByCategoryId(Long id) {

        Category category = repository.getById(id);
        Collection<Product> products = category.getProducts();

        return modelMapper.map(products,
                new TypeToken<List<ProductDTO>>() {}.getType());
    }
}
