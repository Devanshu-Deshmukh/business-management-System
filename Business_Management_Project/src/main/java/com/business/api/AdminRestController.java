package com.business.api;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.business.basiclogics.Logic;
import com.business.entities.Admin;
import com.business.entities.Orders;
import com.business.entities.Product;
import com.business.entities.User;
import com.business.services.AdminServices;
import com.business.services.OrderServices;
import com.business.services.ProductServices;
import com.business.services.UserServices;

@RestController
@RequestMapping("/api")
public class AdminRestController {

    @Autowired
    private UserServices services;
    @Autowired
    private AdminServices adminServices;
    @Autowired
    private ProductServices productServices;
    @Autowired
    private OrderServices orderServices;

    // Store logged-in user in session-like state (same as original)
    private String loggedInEmail;
    private User loggedInUser;

    // ============ AUTH ============

    @PostMapping("/admin/login")
    public ResponseEntity<?> adminLogin(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        if (adminServices.validateAdminCredentials(email, password)) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Login successful");
            return ResponseEntity.ok(response);
        } else {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Invalid email or password");
            return ResponseEntity.ok(response);
        }
    }

    @PostMapping("/user/login")
    public ResponseEntity<?> userLogin(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("userEmail");
        String password = credentials.get("userPassword");
        if (services.validateLoginCredentials(email, password)) {
            loggedInEmail = email;
            loggedInUser = services.getUserByEmail(email);
            List<Orders> orders = orderServices.getOrdersForUser(loggedInUser);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("name", loggedInUser.getUname());
            response.put("orders", orders);
            return ResponseEntity.ok(response);
        } else {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Invalid email or password");
            return ResponseEntity.ok(response);
        }
    }

    // ============ ADMIN SERVICES (Dashboard data) ============

    @GetMapping("/admin/services")
    public ResponseEntity<?> getAdminDashboard() {
        List<User> users = services.getAllUser();
        List<Admin> admins = adminServices.getAll();
        List<Product> products = productServices.getAllProducts();
        List<Orders> orders = orderServices.getOrders();
        Map<String, Object> response = new HashMap<>();
        response.put("users", users);
        response.put("admins", admins);
        response.put("products", products);
        response.put("orders", orders);
        return ResponseEntity.ok(response);
    }

    // ============ ADMIN CRUD ============

    @PostMapping("/admin/add")
    public ResponseEntity<?> addAdmin(@RequestBody Admin admin) {
        adminServices.addAdmin(admin);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Admin added successfully");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/admin/{id}")
    public ResponseEntity<Admin> getAdmin(@PathVariable int id) {
        Admin admin = adminServices.getAdmin(id);
        return ResponseEntity.ok(admin);
    }

    @PutMapping("/admin/update/{id}")
    public ResponseEntity<?> updateAdmin(@RequestBody Admin admin, @PathVariable int id) {
        adminServices.update(admin, id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Admin updated successfully");
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/admin/delete/{id}")
    public ResponseEntity<?> deleteAdmin(@PathVariable int id) {
        adminServices.delete(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Admin deleted successfully");
        return ResponseEntity.ok(response);
    }

    // ============ USER CRUD ============

    @PostMapping("/user/add")
    public ResponseEntity<?> addUser(@RequestBody User user) {
        services.addUser(user);
        Map<String, String> response = new HashMap<>();
        response.put("message", "User added successfully");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUser(@PathVariable int id) {
        User user = services.getUser(id);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/user/update/{id}")
    public ResponseEntity<?> updateUser(@RequestBody User user, @PathVariable int id) {
        services.updateUser(user, id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "User updated successfully");
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/user/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable int id) {
        services.deleteUser(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "User deleted successfully");
        return ResponseEntity.ok(response);
    }

    // ============ PRODUCT CRUD ============

    @PostMapping("/product/add")
    public ResponseEntity<?> addProduct(@RequestBody Product product) {
        productServices.addProduct(product);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Product added successfully");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable int id) {
        Product product = productServices.getProduct(id);
        return ResponseEntity.ok(product);
    }

    @PutMapping("/product/update/{id}")
    public ResponseEntity<?> updateProduct(@RequestBody Product product, @PathVariable int id) {
        productServices.updateproduct(product, id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Product updated successfully");
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/product/delete/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable int id) {
        productServices.deleteProduct(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Product deleted successfully");
        return ResponseEntity.ok(response);
    }

    // ============ PRODUCT SEARCH & ORDER ============

    @PostMapping("/product/search")
    public ResponseEntity<?> searchProduct(@RequestBody Map<String, String> body) {
        String name = body.get("productName");
        Product product = productServices.getProductByName(name);
        Map<String, Object> response = new HashMap<>();
        if (product == null) {
            response.put("message", "SORRY...! Product Unavailable");
            response.put("product", null);
        } else {
            response.put("product", product);
        }
        if (loggedInUser != null) {
            List<Orders> orders = orderServices.getOrdersForUser(loggedInUser);
            response.put("orders", orders);
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/product/order")
    public ResponseEntity<?> placeOrder(@RequestBody Map<String, Object> body) {
        Orders order = new Orders();
        order.setoName((String) body.get("oName"));
        order.setoPrice(Double.parseDouble(body.get("oPrice").toString()));
        order.setoQuantity(Integer.parseInt(body.get("oQuantity").toString()));
        double totalAmount = Logic.countTotal(order.getoPrice(), order.getoQuantity());
        order.setTotalAmmout(totalAmount);
        order.setUser(loggedInUser);
        order.setOrderDate(new Date());
        orderServices.saveOrder(order);
        Map<String, Object> response = new HashMap<>();
        response.put("amount", totalAmount);
        response.put("message", "Order placed successfully");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/user/orders")
    public ResponseEntity<?> getUserOrders() {
        if (loggedInUser != null) {
            List<Orders> orders = orderServices.getOrdersForUser(loggedInUser);
            return ResponseEntity.ok(orders);
        }
        return ResponseEntity.ok(List.of());
    }
}
