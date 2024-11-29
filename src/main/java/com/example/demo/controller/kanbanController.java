package com.example.demo.controller;

import com.example.demo.entity.kanbanEntity;
import com.example.demo.service.kanbanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/data")
@CrossOrigin(origins = "http://localhost:3000") // React 앱의 Origin 허용
public class kanbanController {

    @Autowired
    private kanbanService kanbanService;

    // 사용자 생성
    @PostMapping
    public kanbanEntity createKanban(@RequestBody kanbanEntity kanbanentity) {
        return kanbanService.createKanban(kanbanentity);
    }

    // Kanban 데이터 업데이트
    @PutMapping("/{id}")
    public kanbanEntity updateKanban(@PathVariable("id") Long id, @RequestBody kanbanEntity kanbanEntity) {
        return kanbanService.updateKanban(id, kanbanEntity);
    }

    // Kanban 데이터 삭제
    @DeleteMapping("/{id}")
    public void deleteKanban(@PathVariable Long id) {
        kanbanService.deleteKanban(id);
    }

    // 모든 Kanban 데이터 조회
    @GetMapping
    public List<kanbanEntity> getAllKanbans() {
        System.out.println(kanbanService.getAllKanbans());
        return kanbanService.getAllKanbans();
    }

    // 사용자 조회
    @GetMapping("/{id}")
    public kanbanEntity getKanban(@PathVariable Long id) {
        return kanbanService.getId(id);
    }
}
