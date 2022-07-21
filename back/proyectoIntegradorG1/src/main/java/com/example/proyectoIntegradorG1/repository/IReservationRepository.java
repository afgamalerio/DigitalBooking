package com.example.proyectoIntegradorG1.repository;

import com.example.proyectoIntegradorG1.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;

public interface IReservationRepository extends JpaRepository<Reservation,Long> {

    //Query Listar Reservas Por Producto
    @Query("SELECT p FROM Reservation p WHERE p.product.id = ?1")
    Collection<Reservation> findAllReservationsByProduct(Long product_id);

    //Query Listar Reservas por usuario
    @Query("SELECT p FROM Reservation p WHERE p.user.id = ?1")
    Collection<Reservation> findAllReservationsByUser(Long user_id);
}
