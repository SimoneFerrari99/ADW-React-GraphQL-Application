package com.adwProject.Backend.secondary.dto;

import com.adwProject.Backend.secondary.entity.enums.Typology;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.Value;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Setter
@Getter
public class UserInput {
    private String code;        //Used for pass data with multiple attributes in one shot from client to server. The name of this DTO is UserInput
    @Enumerated(EnumType.STRING)
    @Column(length = 3)
    private Typology typology;
    private boolean active;
    private String email;
    private String pw;
}
