package com.adwProject.Backend.helper.map;

import com.adwProject.Backend.dto.UserInput;
import com.adwProject.Backend.entity.User;

public class MapUser {
    public User mapInputToUser(UserInput userInput) {
        User user = new User();

        user.setCode(userInput.getCode());
        user.setTypology(userInput.getTypology());
        user.setActive(userInput.isActive());
        user.setEmail(userInput.getEmail());
        user.setPw(userInput.getPw());

        return user;
    }
}
