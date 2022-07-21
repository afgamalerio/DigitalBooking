package com.example.proyectoIntegradorG1.service;

import com.example.proyectoIntegradorG1.model.Feature;
import com.example.proyectoIntegradorG1.model.dto.FeatureDTO;
import com.example.proyectoIntegradorG1.repository.IFeatureRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service("FeatureService")
public class FeatureService implements IService<FeatureDTO>{

    IFeatureRepository repository;
    ObjectMapper mapper;
    ModelMapper modelMapper;

    @Autowired
    public FeatureService(IFeatureRepository repository, ObjectMapper mapper, ModelMapper modelMapper) {
        this.repository = repository;
        this.mapper = mapper;
        this.modelMapper = modelMapper;
    }

    @Override
    public FeatureDTO save(FeatureDTO featureDTO) {
        Feature feature = mapper.convertValue(featureDTO,Feature.class);
        return mapper.convertValue(repository.save(feature),FeatureDTO.class);
    }

    @Override
    public FeatureDTO findById(Long id) {
        return mapper.convertValue(repository.findById(id),FeatureDTO.class);
    }

    @Override
    public List<FeatureDTO> findAll() {
        Collection<Feature> features = repository.findAll();
        return modelMapper.map(features, new TypeToken<List<FeatureDTO>>() {}.getType());
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
    public FeatureDTO update(FeatureDTO featureDTO) {
        if (findById(featureDTO.getId())!=null){
            return save(featureDTO);
        }
        return null;
    }
}
