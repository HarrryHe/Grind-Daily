package com.example.demo;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    @GetMapping("/api/tasks")
    public String[] getTasks() {
        return new String[] { "Task 1", "Task 2", "Task 3" };
    }
}