package com.example.demo.service;

import com.example.demo.entity.kanbanEntity;
import com.example.demo.repository.kanbanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class kanbanService {
    @Autowired
    private kanbanRepository kanbanRepository;

    // 새로운 Kanban 데이터 생성
    public kanbanEntity createKanban(kanbanEntity kanbanEntity) {
        return kanbanRepository.save(kanbanEntity);
    }

    // 모든 Kanban 데이터 조회
    public List<kanbanEntity> getAllKanbans() {
        return kanbanRepository.findAll();
    }

    // ID로 Kanban 데이터 조회
    public kanbanEntity getKanbanById(Long id) {
        Optional<kanbanEntity> kanban = kanbanRepository.findById(id);
        return kanban.orElseThrow(() -> new RuntimeException("Kanban not found with id: " + id));
    }

    // Kanban 데이터 업데이트
    public kanbanEntity updateKanban(Long id, kanbanEntity kanbanEntity) {
        kanbanEntity existingKanban = getKanbanById(id);
        if (existingKanban == null) {
            System.out.println("Kanban not found with id: " + id);
            throw new RuntimeException("Kanban not found with id: " + id); // 추가된 디버깅 메시지
        }
        existingKanban.setCustomer(kanbanEntity.getCustomer());
        existingKanban.setCaller(kanbanEntity.getCaller());
        existingKanban.setStatus(kanbanEntity.getStatus());
        existingKanban.setContext(kanbanEntity.getContext());
        return kanbanRepository.save(existingKanban);
    }

    // Kanban 데이터 삭제
    public void deleteKanban(Long id) {
        kanbanRepository.deleteById(id);
    }

    // 사용자 조회
    public kanbanEntity getId(Long id) {
        return kanbanRepository.findById(id).orElse(null);
    }
}
