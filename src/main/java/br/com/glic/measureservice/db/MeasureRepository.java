package br.com.glic.measureservice.db;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface MeasureRepository extends JpaRepository<MeasureEntity, UUID> {
}
