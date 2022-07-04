package com.adwProject.Backend.primary.dto;

import com.adwProject.Backend.primary.entity.Agent;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.Value;


@Setter
@Getter
public class CustomerInput {
    private String custName;
    private String custCity;
    private String workingArea;
    private String custCountry;
    private int grade;
    private Float openingAMT;
    private Float receiveAMT;
    private Float paymentAMT;
    private Float outstandingAMT;
    private String phoneNO;
    private String agentCode;
}
