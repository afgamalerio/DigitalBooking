package com.example.proyectoIntegradorG1.service;

import com.example.proyectoIntegradorG1.model.Product;
import com.example.proyectoIntegradorG1.model.Reservation;
import com.example.proyectoIntegradorG1.model.User;
import com.example.proyectoIntegradorG1.model.dto.*;
import com.example.proyectoIntegradorG1.repository.IReservationRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.apache.log4j.Logger;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@Service("ReservationService")
public class ReservationService implements IService<ReservationDTO>{
    IReservationRepository repository;
    ObjectMapper mapper;
    ModelMapper modelMapper;

    private ProductService serviceProduct;
    private UserService serviceUser;

    final static Logger logger = Logger.getLogger(ReservationService.class);

    @Autowired
    public ReservationService(IReservationRepository repository, ObjectMapper mapper, ModelMapper modelMapper, ProductService serviceProduct, UserService serviceUser) {
        this.repository = repository;
        this.mapper = mapper;
        this.modelMapper = modelMapper;
        this.serviceProduct = serviceProduct;
        this.serviceUser = serviceUser;
    }


    @Override
    public ReservationDTO save(ReservationDTO reservationDTO) {
        logger.info("getProduct.getId: " + reservationDTO.getProduct().getId());
        ProductDTO productDTO = serviceProduct.findById(reservationDTO.getProduct().getId());
        logger.info("service reservation productoDTO: " + productDTO);
        UserDTO userDTO = serviceUser.findById(reservationDTO.getUser().getId());
        logger.info("service reservation userDTO: " + userDTO);
        logger.info("service reservation: " + "fuera del if");
        if(productDTO!=null&&userDTO!=null){
            logger.info("service reservation: " + "dentro del if");
            Reservation reservation = mapper.convertValue(reservationDTO,Reservation.class);
            reservation.setStartHour(mapper.convertValue(reservation.getStartHour(), Date.class));
            reservation.setProduct(mapper.convertValue(productDTO, Product.class));
            reservation.setUser(mapper.convertValue(userDTO, User.class));

            logger.info("reservation: " + reservation.toString());
            ReservationDTO reservationCreated = mapper.convertValue(repository.save(reservation),ReservationDTO.class);
            reservationCreated.setProduct(mapper.convertValue(productDTO, ProductIdDTO.class));
            reservationCreated.setUser(mapper.convertValue(userDTO,
                    UserIdDTO.class));
            return reservationCreated;
        }else {
            logger.error("Error al crear una nueva reserva");
            return null;
        }



    }

    @Override
    public ReservationDTO findById(Long id) {
        return mapper.convertValue(repository.findById(id),ReservationDTO.class);
    }

    @Override
    public List<ReservationDTO> findAll() {
        Collection<Reservation> reservations = repository.findAll();
        return modelMapper.map(reservations,new TypeToken<List<ReservationDTO>>() {}.getType());
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
    public ReservationDTO update(ReservationDTO reservationDTO) {
        if(findById(reservationDTO.getId())!=null){
            return save(reservationDTO);
        }
        return null;
    }

    public List<ReservationDTO> findAllReservationsByProduct (Long product_id){
        if (serviceProduct.findById(product_id)!=null){
            Collection<Reservation> reservationList = repository.findAllReservationsByProduct(product_id);
            return modelMapper.map(reservationList,new TypeToken<List<ReservationDTO>>() {}.getType());
        }else {
            return null;
        }
    }

    public List<ReservationCompleteDTO> findAllReservationsByUser (Long user_id){

        Collection<Reservation> reservationList = repository.findAllReservationsByUser(user_id);

        if (reservationList != null){
            return modelMapper.map(reservationList,new TypeToken<List<ReservationCompleteDTO>>() {}.getType());
        }else {
            return null;
        }
    }
}
