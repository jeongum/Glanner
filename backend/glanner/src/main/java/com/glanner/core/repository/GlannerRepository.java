package com.glanner.core.repository;

import com.glanner.core.domain.glanner.Glanner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GlannerRepository extends JpaRepository<Glanner, Long> {
}