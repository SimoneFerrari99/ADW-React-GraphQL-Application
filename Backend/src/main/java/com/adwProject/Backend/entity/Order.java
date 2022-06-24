package com.adwProject.Backend.entity;

import lombok.*;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@ToString
@Table(name = "orders", schema= "public")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, name = "ORD_NUM")
    private long ordNum;

    @Column(name = "ORD_AMOUNT")
    private float ordAMT;
    @Column(name = "ADVANCE_AMOUNT")
    private float advanceAMT;
    @Column(name = "ORD_DATE")
    private String ordDate;

    @MapsId
    @ManyToOne
    @JoinColumn(name = "agentCode")
    private Agent agentCode;

    @MapsId
    @ManyToOne
    @JoinColumn(name = "custCode")
    private Customer custCode;

    @Column(name = "ORD_DESCRIPTION")
    private String ordDescription;
}