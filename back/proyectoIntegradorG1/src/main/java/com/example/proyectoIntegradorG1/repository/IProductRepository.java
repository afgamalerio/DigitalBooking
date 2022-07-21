package com.example.proyectoIntegradorG1.repository;

import com.example.proyectoIntegradorG1.model.Category;
import com.example.proyectoIntegradorG1.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Pageable;
import java.util.Collection;
import java.util.Date;


@Repository
public interface IProductRepository extends JpaRepository<Product, Long> {

    //Query Listar productos por categoría
    @Query("SELECT p FROM Product p WHERE p.category.id = ?1")
    Page<Product> findAllByCategory(Long category_id, Pageable pageable);


    //Query Listar productos por ciudad
    @Query("SELECT p FROM Product p WHERE p.city.id = ?1")
    Page<Product> findAllByCity(Long city_id, Pageable pageable);

    //Query Listar productos por orden de rating
    @Query(nativeQuery = true, value = "select * from product order by rating" +
            " DESC")
    Page<Product> findAllByRating(Pageable pageable);

    //Listar productos disponibles por ciudad y fechas
    @Query(nativeQuery = true, value ="SELECT * FROM product AS p" +
            " INNER JOIN city AS c" +
            " ON p.city_id = c.id" +
            " WHERE (?1 IS null OR p.city_id = ?1) " +
            "AND ((?2 IS null AND ?3 IS null) OR p.id" +
            " NOT IN (SELECT p.id FROM product AS p" +
            " LEFT OUTER JOIN reservation AS r" +
            " ON p.id = r.product_id" +
            " WHERE (?2 IS null OR ?2 BETWEEN r.start_date AND r" +
            ".finish_date)" +
            " OR (?3 IS null OR ?3 BETWEEN r.start_date AND r" +
            ".finish_date) " +
            "OR ((?2 IS null OR ?3 IS null) " +
            "OR r.start_date BETWEEN ?2 AND ?3)))"
    )
    Page<Product> findAllByCityandDates(@Nullable long city,
                                              @Nullable Date start_date,
                                              @Nullable Date finish_date, Pageable pageable);

    //Listar productos disponibles por fechas
    @Query(nativeQuery = true, value ="SELECT * FROM product AS p" +
            " WHERE p.id" +
            " NOT IN (SELECT p.id FROM product AS p" +
            " LEFT OUTER JOIN reservation AS r" +
            " ON p.id = r.product_id" +
            " WHERE (?1 IS null OR ?1 BETWEEN r.start_date AND r" +
            ".finish_date)" +
            " OR (?2 IS null OR ?2 BETWEEN r.start_date AND r" +
            ".finish_date) " +
            "OR ((?1 IS null OR ?2 IS null) " +
            "OR r.start_date BETWEEN ?1 AND ?2))"
    )
    Page<Product> findAllByDates(@Nullable Date start_date,
                                              @Nullable Date finish_date, Pageable pageable);

    //findById propio
    @Query(nativeQuery = true, value ="SELECT * FROM product AS p" +
            " WHERE p.id = ?1")
    Product findById2(Long id);

    /*Paginación*/

    @Query(nativeQuery = true, value = "select * from product AS p order by " +
            "p.rating DESC")
    Page<Product> findAllByRatingPageable(Pageable pageable);

}
