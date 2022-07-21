package com.example.proyectoIntegradorG1.exceptions;

import org.apache.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BadRequestException extends Exception{

    final static Logger logger = Logger.getLogger(BadRequestException.class);

    public BadRequestException(String message) {
        super(message);
        logger.error(message);
    }
}
