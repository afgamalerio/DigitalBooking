package com.example.proyectoIntegradorG1.service;

import com.example.proyectoIntegradorG1.jwt.MyUserDetailsService;
import com.example.proyectoIntegradorG1.model.Category;
import com.example.proyectoIntegradorG1.model.Rol;
import com.example.proyectoIntegradorG1.model.User;
import com.example.proyectoIntegradorG1.model.dto.CategoryDTO;
import com.example.proyectoIntegradorG1.model.dto.UserDTO;
import com.example.proyectoIntegradorG1.repository.ICategoryRepository;
import com.example.proyectoIntegradorG1.repository.IRolRepository;
import com.example.proyectoIntegradorG1.repository.IUserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.apache.log4j.Logger;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service("UserService")
public class UserService implements IService<UserDTO> {

    IUserRepository repository;
    IRolRepository rolRepository;
    ObjectMapper mapper;
    ModelMapper modelMapper;

  /*  @Autowired
    private BCryptPasswordEncoder encoder;*/

    final static Logger logger = Logger.getLogger(UserService.class);

    @Autowired
    public UserService(IUserRepository repository, ObjectMapper mapper, ModelMapper modelMapper, IRolRepository rolRepository) {
        this.repository = repository;
        this.mapper = mapper;
        this.modelMapper = modelMapper;
        this.rolRepository = rolRepository;
        //comentario
    }


  /*  @Override
    public User save(User user) {
      //  User user = mapper.convertValue(userDTO, User.class);

        //Analiza si existe el rol USER en la BD para asignarlo por defecto y
        // si no lo crea y lo asigna
        Optional<Rol> userRol = rolRepository.getRolByName("CLIENT");

        if(userRol.isPresent()){
            user.setRol(mapper.convertValue(userRol,
                    Rol.class));
        }else{
            Rol rol = new Rol();
            rol.setName("CLIENT");
            user.setRol(rolRepository.save(rol));
        }

        //Encripta la contraseña antes de guardarla
        encoder = new BCryptPasswordEncoder(12);
        user.setPassword(encoder.encode(user.getPassword()));

        User userCreated = null;
        try {
            userCreated = repository.save(user);
        }catch (DataIntegrityViolationException e){
            //capta el error de dato repetido en el email
            logger.error(e);
        }

    //    return mapper.convertValue(userCreated, UserDTO.class);
        return user;
    }*/

    @Override
    public UserDTO save(UserDTO userDTO) {
        return null;
    }

    @Override
    public UserDTO findById(Long id) {
        return mapper.convertValue(repository.findById(id), UserDTO.class);
    }

    @Override
    public List<UserDTO> findAll() {
        Collection<User> users = repository.findAll();
        return modelMapper.map(users,
                new TypeToken<List<UserDTO>>() {}.getType());
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

    @Override
    public UserDTO update(UserDTO userDTO) {
        return null;
    }

}
