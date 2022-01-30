package com.glanner.api.controller;

import com.glanner.api.dto.request.SaveUserReqDto;
import com.glanner.api.dto.response.BaseResponseEntity;
import com.glanner.api.exception.UserNotFoundException;
import com.glanner.api.queryrepository.UserQueryRepository;
import com.glanner.api.service.UserService;
import com.glanner.core.domain.user.User;
import com.glanner.core.repository.UserRepository;
import com.glanner.security.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final UserQueryRepository userQueryRepository;
    private final UserRepository userRepository;

    @PostMapping("/join")
    public ResponseEntity<BaseResponseEntity> join(@RequestBody SaveUserReqDto requestDto) {

        userService.saveUser(requestDto);

        return ResponseEntity.status(200).body(new BaseResponseEntity(200, "Success"));
    }

    @Transactional
    @DeleteMapping("/withdraw")
    public ResponseEntity<BaseResponseEntity> delete() {
        String userEmail = getUsername(SecurityUtils.getCurrentUsername());
        User findUser = getUser(userRepository.findByEmail(userEmail));
        userQueryRepository.deleteAllWorksByScheduleId(findUser.getSchedule().getId());
        userRepository.delete(findUser);
        return ResponseEntity.status(200).body(new BaseResponseEntity(200, "Success"));
    }

    public String getUsername(Optional<String> username){
        return username.orElseThrow(UserNotFoundException::new);
    }
    public User getUser(Optional<User> user){
        return user.orElseThrow(() -> new IllegalArgumentException("유저가 존재하지 않습니다."));
    }
}