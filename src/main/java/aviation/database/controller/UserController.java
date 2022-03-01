package aviation.database.controller;

import aviation.database.domain.User;
import aviation.database.repo.UserRepo;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserRepo userRepo;

    public UserController(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @GetMapping
    public List<User> userList() {
        return userRepo.findAll();
    }

    @PutMapping("{id}")
    public User update(@PathVariable("id") User userFromDB,
                       @RequestBody User user) {
        BeanUtils.copyProperties(user, userFromDB, "id", "password");
        return userRepo.save(userFromDB);
    }

    @PostMapping
    public User create(@RequestBody User user) {
        return userRepo.save(user);
    }
}
