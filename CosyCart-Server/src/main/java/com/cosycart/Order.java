package com.cosycart;

import java.util.Date;
import jakarta.persistence.*;


@Entity
@Table(name = "user_orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "user_email")
    private String userEmail;
    private String productName;
    private Double price;
    private String status; // Pending, Shipped, Delivered
    
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "order_date") 
    private Date orderDate;

    
    @PrePersist
    protected void onCreate() {
        if (this.orderDate == null) {
            this.orderDate = new Date();
        }
    }
    
    // Naye fields jo aapne maange thhe
    private String address;
    private String paymentMethod;

    // Getters and Setters (Purane bhi hain aur naye bhi)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }
    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Date getOrderDate() { return orderDate; }
    public void setOrderDate(Date orderDate) { this.orderDate = orderDate; }
    
    // Naye Getters aur Setters
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
}