package com.adwProject.Backend.entity;

import lombok.*;
import org.hibernate.annotations.Type;

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
    @Column(unique = true, name = "ord_num")
    private String ordNum;

    @Column(name = "ord_amt")
    private float ordAMT;

    @Column(name = "advance_amt")
    private float advanceAMT;

    @Column(name = "ord_date")
    private String ordDate;

    @MapsId
    @ManyToOne
    @JoinColumn(name = "agent_code")
    private Agent agentCode;

    @MapsId
    @ManyToOne
    @JoinColumn(name = "cust_code")
    private Customer custCode;

    @Column(name = "ord_description")
    private String ordDescription;
}
