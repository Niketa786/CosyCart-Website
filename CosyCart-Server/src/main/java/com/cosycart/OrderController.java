package com.cosycart;

import com.cosycart.Order;
import com.cosycart.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepo;

    @PostMapping("/place")
    public Order placeOrder(@RequestBody Order order) {
        order.setOrderDate(new Date());
        order.setStatus("Pending"); 
        return orderRepo.save(order);
    }

    @GetMapping("/user/{email}")
    public List<Order> getOrders(@PathVariable String email) {
        return orderRepo.findByUserEmail(email);
    }

    @GetMapping("/all")
    public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }

    @PutMapping("/update-status/{id}")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody String status) {
        return orderRepo.findById(id).map(order -> {
            order.setStatus(status);
            orderRepo.save(order);
            return ResponseEntity.ok("Status updated to " + status);
        }).orElse(ResponseEntity.notFound().build());
    }

    // --- Naya Delete Function (Baki code ko bina chede yahan add kiya hai) ---
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteOrder(@PathVariable Long id) {
        if (orderRepo.existsById(id)) {
            orderRepo.deleteById(id);
            return ResponseEntity.ok("Order deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}