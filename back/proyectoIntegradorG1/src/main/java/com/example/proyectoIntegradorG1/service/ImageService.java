package com.example.proyectoIntegradorG1.service;

import com.example.proyectoIntegradorG1.model.Image;
import com.example.proyectoIntegradorG1.model.Product;
import com.example.proyectoIntegradorG1.model.dto.ImageDTO;
import com.example.proyectoIntegradorG1.model.dto.ProductDTO;
import com.example.proyectoIntegradorG1.repository.IImageRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service("ImageService")
public class ImageService implements IService<ImageDTO>{
    IImageRepository repository;
    ObjectMapper mapper;
    ModelMapper modelMapper;

    @Autowired
    public ImageService(IImageRepository repository, ObjectMapper mapper, ModelMapper modelMapper) {
        this.repository = repository;
        this.mapper = mapper;
        this.modelMapper = modelMapper;
    }

    @Override
    public ImageDTO save(ImageDTO imageDTO) {
        Image image = mapper.convertValue(imageDTO,
                Image.class);
        return mapper.convertValue(repository.save(image),
                ImageDTO.class);
    }

    @Override
    public ImageDTO findById(Long id) {
        return mapper.convertValue(repository.findById(id), ImageDTO.class);
    }

    @Override
    public List<ImageDTO> findAll() {
        Collection<Image> categories = repository.findAll();
        return modelMapper.map(categories,
                new TypeToken<List<ImageDTO>>() {}.getType());
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
    public ImageDTO update(ImageDTO imageDTO) {

        if(findById(imageDTO.getId())!= null){
            return save(imageDTO);
        }

        return null;
    }

    public Boolean setProduct(ImageDTO imageDTO, ProductDTO product) throws NullPointerException {
        Image image = mapper.convertValue(imageDTO,
                Image.class);
        image.setProduct(mapper.convertValue(product, Product.class));

        Image imagenGuardada = repository.save(image);

        //Compruebo que el producto no sea nulo
        if(product!=null) {
            if (imagenGuardada.getProduct().getId().equals(product.getId())) {
                return true;
            }
            return false;
        }else{
            return true;
        }

    }

}
