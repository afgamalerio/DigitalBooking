package com.example.proyectoIntegradorG1.repository;


import com.example.proyectoIntegradorG1.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<User, Long> {

    //Query Listar User por Email
    @Query("from User u where u.email = :email")
    Optional<User> getUserByEmail(@Param("email") String email);
}
