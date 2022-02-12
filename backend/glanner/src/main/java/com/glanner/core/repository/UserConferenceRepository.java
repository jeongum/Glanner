package com.glanner.core.repository;

import com.glanner.core.domain.user.User;
import com.glanner.core.domain.user.UserConference;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserConferenceRepository extends JpaRepository<UserConference, Long> {
}
