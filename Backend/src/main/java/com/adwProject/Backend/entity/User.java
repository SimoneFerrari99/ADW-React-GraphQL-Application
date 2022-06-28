package com.adwProject.Backend.entity;

import com.adwProject.Backend.entity.enums.Typology;
import lombok.*;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@ToString
@Table(name = "users", schema= "public")
public class User {

    @Id
    @Column(unique = true, name = "code")
    private String code;

    @Enumerated(EnumType.STRING)
    @Column(length = 3)
    private Typology typology;

    @Column(name = "active")
    private boolean active;

    @Column(name = "email")
    private String email;

    @Column(name = "pw")
    private String pw;
}