package com.adwProject.Backend.resolver;

import com.adwProject.Backend.entity.Agent;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;



@Component
@Slf4j
@AllArgsConstructor
public class OrderResolver {
    /*public Order orderById(long id) {
        log.info("Retrieving order id: {}", id);

        return Order.builder()
                .ordNum(id)
                .ordAMT(5.5f)
                .advanceAMT(5.5f)
                .ordDate("ieri")
                .agentCode(1)
                .custCode(1)
                .ordDescription("prova")
                .build();
    }
    public Customer customerById(long custCode) {
        return Customer.builder().custCode(custCode).build();
    }
    public Agent agentById(long agentCode) {
        return Agent.builder().agentCode(agentCode).build();
    }*/
    private final OrderService orderService;
    public Agent orderById(long id) {
        return OrderService.getById(id);
    }
}
}
