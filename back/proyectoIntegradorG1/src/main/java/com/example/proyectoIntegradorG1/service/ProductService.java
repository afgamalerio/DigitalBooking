package com.example.proyectoIntegradorG1.service;

import com.example.proyectoIntegradorG1.model.*;
import com.example.proyectoIntegradorG1.model.dto.*;
import com.example.proyectoIntegradorG1.repository.IImageRepository;
import com.example.proyectoIntegradorG1.repository.IProductRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.log4j.Logger;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import javax.persistence.EntityManager;
import java.util.Collection;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

@Service("ProductService")
public class ProductService implements IServiceProduct{

    IProductRepository repository;
    IImageRepository imageRepository;
    ObjectMapper mapper;
    ModelMapper modelMapper;

    private CategoryService serviceCategory;
    private CityService serviceCity;
    private ImageService serviceImage;
    private FeatureService serviceFeature;

    final static Logger logger = Logger.getLogger(ProductService.class);


    @Autowired
    public ProductService(IProductRepository repository, ObjectMapper mapper,
                          ModelMapper modelMapper,
                          CategoryService serviceCategory,
                          CityService serviceCity, ImageService serviceImage,
                          FeatureService serviceFeature,
                          IImageRepository imageRepository) {
        this.repository = repository;
        this.mapper = mapper;
        this.modelMapper = modelMapper;
        this.serviceCategory = serviceCategory;
        this.serviceCity = serviceCity;
        this.serviceImage = serviceImage;
        this.serviceFeature = serviceFeature;
        this.imageRepository = imageRepository;
    }

    public ProductCreateDTO save(ProductCreateDTO productDTO) {
        logger.info("productDTO " + productDTO.toString());

        CategoryDTO categoryDTO = serviceCategory.findById(productDTO.getCategory().getId());
        CityDTO cityDTO = serviceCity.findById(productDTO.getCity().getId());

        //Comprueba que existan las características en la BD
        List<FeatureIdDTO> listFeaturesDTO = productDTO.getFeatures();
        Boolean featuresOk = true;
        for (FeatureIdDTO featureDTO : listFeaturesDTO) {
            if(serviceFeature.findById(featureDTO.getId())==null)
                featuresOk = false;
        }

        //Comprueba que existan las imágenes en la BD
        List<ImageIdDTO> listImagesDTO = productDTO.getImages();
        Boolean imagesOk = true;
        if(!listImagesDTO.isEmpty() || listImagesDTO!=null) {
            for (ImageIdDTO imageDTO : listImagesDTO) {
                logger.info("serviceimage: " + serviceImage.findById(imageDTO.getId()).toString());
                if (serviceImage.findById(imageDTO.getId()) == null)
                    imagesOk = false;
            }
        }

        //Analiza que existan en la BD todos los atributos del producto
        if(categoryDTO!= null && cityDTO!=null && featuresOk && imagesOk){

            //Comprueba si ya existe el producto para ver si es una
            // actualización
            if(productDTO.getId()!=null){
                //Analiza si el listado de imágenes se modificó y setea a
                // null las imágenes que ya no pertenecen al producto
                logger.info("productDTO.getId()!=null");
                updateListImages(productDTO);
            }

            //Setea a null las imágenes para poder guardar el producto en la
            // BD y luego asignarle a las imágenes este producto
            productDTO.setImages(null);

            //Mappea a product
            Product product = mapper.convertValue(productDTO, Product.class);
            logger.info("despues de mapear producto");

            //Asigna/actualiza la categoría, ciudad y características
            product.setCategory(mapper.convertValue(categoryDTO, Category.class));
            product.setCity(mapper.convertValue(cityDTO,  City.class));
            product.setFeatures(modelMapper.map(listFeaturesDTO, new TypeToken<List<Feature>>() {}.getType()));

            //Guarda el producto en la BD
            Product productDB = repository.save(product);
            logger.info("crea product: " + productDB);

            //Ahora el producto tiene id por lo que le asigna al listado de
            // imágenes el producto creado
           if(!listImagesDTO.isEmpty() || listImagesDTO!=null){
                for (ImageIdDTO imageDTO : listImagesDTO) {
                    Image image =
                            mapper.convertValue(serviceImage.findById(imageDTO.getId()), Image.class);
                    image.setProduct(product);
                    imageRepository.save(image);
                }
            }

            //Le asigna al objeto ProductDTO las imágenes para que las
            // devuelva a través del controller porque hay un delay en la
            // asociación entre las clases y la BD
            ProductCreateDTO productDTO1= mapper.convertValue(productDB,
                  ProductCreateDTO.class);
            productDTO1.setImages(listImagesDTO);


            return productDTO1;

        }else{
            logger.error("Error al crear un nuevo producto");
            //Manejar excepciones
            return null;
        }
    }

    @Override
    public ProductDTO findById(Long id) {
     //   logger.info("probando modelmapper: " + modelMapper.map(repository
        //   .findById2(id), new TypeToken<ProductDTO>() {}.getType()));
        Product product = repository.findById2(id);
        ProductDTO productDTO = mapper.convertValue(product,
                ProductDTO.class);
        productDTO.setReservations(modelMapper.map(product.getReservations(),
                new TypeToken<List<ReservationDisabledDTO>>() {}.getType()));
        return productDTO;
        /*return modelMapper.map(repository.findById2(id),
                ProductDTO.class);*/
    }

    @Override
    public List<ProductDTO> findAll() {
        Collection<Product> objects = repository.findAll();
        logger.info("objects: " + objects.toArray().toString());
        return modelMapper.map(objects,
                new TypeToken<List<ProductDTO>>() {}.getType());
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

    public ProductCreateDTO update(ProductCreateDTO productDTO) {
        return save(productDTO);
    }

    public Page<ProductDTO> findAllByCategory(Long category_id,
                                            Pageable pageable){

        if(serviceCategory.findById(category_id)!=null){
            Page<Product> productList =
                    repository.findAllByCategory(category_id, pageable);
            logger.info("productService productList: " + productList);
            return modelMapper.map(productList,
                    new TypeToken<Page<ProductDTO>>() {}.getType());

        }else {
            //manejar excepciones
            return null;
        }

    }

    public Page<ProductDTO> findAllByCity(Long city_id, Pageable pageable){

        if(serviceCity.findById(city_id)!=null){
            Page<Product> productList =
                    repository.findAllByCity(city_id, pageable);
            return modelMapper.map(productList,
                    new TypeToken<Page<ProductDTO>>() {}.getType());

        }else {
            //manejar excepciones
            return null;
        }

    }

    public void updateListImages (ProductCreateDTO productDTO){
        logger.info("updateListImages");
        //Analiza si las imagenes se modificaron para actualizarlas
        List<ImageDTO> listNewImages = modelMapper.map(productDTO.getImages(),
                new TypeToken<List<ImageDTO>>() {}.getType());
        List<ImageDTO> listOldImages = findById(productDTO.getId()).getImages();

        //ordena el listado de imágenes de acuerdo al id
        listNewImages.sort(Comparator.comparing(ImageDTO::getId));
        listOldImages.sort(Comparator.comparing(ImageDTO::getId));

        //Compara los strings de los listados de imágenes
        if(!listOldImages.toString().equals(listNewImages.toString())){
            //son distintas por lo tanto habría que actualizarlas
            logger.info("comparando imágenes distintas");
            for (ImageDTO oldImage : listOldImages) {
                //Setea a null todas las imágenes del listado viejo y en la
                // función save se setearan las imágenes actuales
                Boolean response = serviceImage.setProduct(oldImage, null);
            }
        }else{
            logger.info("comparando imágenes IGUALES");
        }
    }

    public Page<ProductDTO> findAllByRating(Pageable pageable) {
        Page<Product> objects = repository.findAllByRating(pageable);
        return modelMapper.map(objects,
                new TypeToken<Page<ProductDTO>>() {}.getType());
    }

    public Page<ProductDTO> findAllByCityandDates (Long city,
                                                              String startDate,
                                                              String finishDate, Pageable pageable){

        Page<Product> objects = repository.findAllByCityandDates(city,
                mapper.convertValue(startDate, Date.class),
                mapper.convertValue(finishDate, Date.class), pageable);
        return modelMapper.map(objects,
                new TypeToken<Page<ProductDTO>>() {}.getType());
    }

    public Page<ProductDTO> findAllByDates (String startDate,
                                                   String finishDate,
                                            Pageable pageable){

        Page<Product> objects =
                repository.findAllByDates(mapper.convertValue(startDate, Date.class),
                mapper.convertValue(finishDate, Date.class), pageable);
        return modelMapper.map(objects,
                new TypeToken<Page<ProductDTO>>() {}.getType());
    }

    /*Paginación*/
    public Page<ProductDTO> findAllPageable(Pageable pageable){
        return modelMapper.map(repository.findAll(pageable),
                new TypeToken<Page<ProductDTO>>() {}.getType());
    }

    public Page<ProductDTO> findAllByRatingPageable(Pageable pageable) {
        logger.info("findAllbyRatingPageable: " + repository.findAllByRatingPageable(pageable).toString());
        return modelMapper.map(repository.findAllByRatingPageable(pageable),
                new TypeToken<Page<ProductDTO>>() {}.getType());
    }
}
