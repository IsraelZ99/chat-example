package com.decsef.demowebsocket;

import com.decsef.demowebsocket.configuration.security.AppUserRole;
import com.decsef.demowebsocket.configuration.security.jwt.JwtUtils;
import com.decsef.demowebsocket.student.Student;
import com.decsef.demowebsocket.student.StudentRepository;
import com.decsef.demowebsocket.user.entities.Rol;
import com.decsef.demowebsocket.user.entities.User;
import com.decsef.demowebsocket.user.repositories.RolRepository;
import com.decsef.demowebsocket.user.repositories.UserRepository;
import javassist.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class CreateUsersImpl implements CommandLineRunner {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private RolRepository rolRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    private final String password;

    public CreateUsersImpl() {
        this.password = "123456";
    }

    @Override
    public void run(String... args) throws Exception {
        Rol rol = rolRepository.save(new Rol(AppUserRole.ADMINISTRADOR));
        User user = userRepository.save(new User("israel.garcia", passwordEncoder.encode(password),
                "Israel Garcia", rol
        ));
        User user2 = userRepository.save(new User("alex.sotelo", passwordEncoder.encode(password),
                "Alex Sotelo", rol
        ));
        User user3 = userRepository.save(new User("martin.perez", passwordEncoder.encode(password),
                "Martin Perez", rol
        ));
        log.info("User 1: "+ user);
        log.info("User 2: "+ user2);
        log.info("User 3: "+ user3);
        generateToken(user);
        generateToken(user2);
        generateToken(user3);
    }

    private void generateToken(User user) {
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                user.getUsername(), password);
        Authentication authenticate = authenticationManager.authenticate(authentication);
        String token = jwtUtils.generateJwtToken(authenticate);
        log.info("Token for: "+user.getUsername()+" = "+ token);
    }
}
