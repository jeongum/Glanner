package com.glanner.core.repository;

import com.glanner.core.domain.glanner.UserGlanner;
import com.glanner.core.domain.user.UserConference;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserConferenceCustomRepository{
    List<UserConference> findByConferenceId(Long conferenceId);
}
