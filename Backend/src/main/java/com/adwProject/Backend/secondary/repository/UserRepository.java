package com.adwProject.Backend.secondary.repository;

import com.adwProject.Backend.secondary.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findById(String id);
    Optional<User> findByEmail(String email);
}
