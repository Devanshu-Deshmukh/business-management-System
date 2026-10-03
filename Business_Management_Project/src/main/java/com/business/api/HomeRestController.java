package com.business.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.business.entities.Product;
import com.business.services.ProductServices;

@RestController
@RequestMapping("/api")
public class HomeRestController {

    @Autowired
    private ProductServices productServices;

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = this.productServices.getAllProducts();
        return ResponseEntity.ok(products);
    }
}
