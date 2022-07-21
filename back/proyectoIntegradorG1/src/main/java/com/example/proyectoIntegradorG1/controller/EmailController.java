package com.example.proyectoIntegradorG1.controller;

import com.example.proyectoIntegradorG1.model.EmailBody;
import com.example.proyectoIntegradorG1.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/email")
public class EmailController {

        @Autowired
        private EmailService emailPort;

        @PostMapping(value = "/send")
        @ResponseBody
        public boolean SendEmail(@RequestBody EmailBody emailBody)  {
            return emailPort.sendEmail(emailBody);
        }

}

