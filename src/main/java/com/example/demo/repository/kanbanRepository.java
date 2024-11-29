package com.example.demo.repository;

import com.example.demo.entity.kanbanEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface kanbanRepository extends JpaRepository<kanbanEntity, Long>{
}
