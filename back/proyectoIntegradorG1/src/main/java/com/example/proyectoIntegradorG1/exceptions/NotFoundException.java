package com.example.proyectoIntegradorG1.exceptions;

import org.apache.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class NotFoundException extends Exception{

    final static Logger logger = Logger.getLogger(NotFoundException.class);

    public NotFoundException(String message) {
        super(message);
        logger.error(message);
    }
}
