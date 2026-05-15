package com.cosycart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired private UserRepository repo;

    @PostMapping("/register")
    public User register(@RequestBody User user) { return repo.save(user); }

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        Optional<User> u = repo.findByEmail(user.getEmail());
        if(u.isPresent() && u.get().getPassword().equals(user.getPassword())) return u.get();
        throw new RuntimeException("Invalid Credentials");
    }
}