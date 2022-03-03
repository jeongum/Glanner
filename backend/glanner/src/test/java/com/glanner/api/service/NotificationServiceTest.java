package com.glanner.api.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.glanner.api.dto.request.SendMailReqDto;
import com.glanner.api.dto.request.SendSmsApiReqDto;
import com.glanner.api.dto.request.SendSmsReqDto;
import com.glanner.api.dto.response.FindNotificationResDto;
import com.glanner.api.dto.response.FindWorkByTimeResDto;
import com.glanner.api.dto.response.SendSmsApiResDto;
import com.glanner.api.exception.DailyWorkNotFoundException;
import com.glanner.api.exception.SMSNotSentException;
import com.glanner.api.exception.UserNotFoundException;
import com.glanner.api.queryrepository.NotificationQueryRepository;
import com.glanner.core.domain.user.*;
import com.glanner.core.repository.DailyWorkScheduleRepository;
import com.glanner.core.repository.NotificationRepository;
import com.glanner.core.repository.UserRepository;
import org.apache.tomcat.util.codec.binary.Base64;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.client.RestTemplate;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import javax.transaction.Transactional;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
class NotificationServiceTest {
    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private NotificationQueryRepository notificationQueryRepository;

    @Autowired
    private DailyWorkScheduleRepository dailyWorkScheduleRepository;

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    public void init() {
        createUser();
    }

    @Test
    public void testModifyStatus() throws Exception{
        //given
        User user = userRepository.findByEmail("cherish8513@naver.com").orElseThrow(UserNotFoundException::new);
        createNotification("content1");
        createNotification("content2");
        createReadNotification("content3");

        //when
        List<Notification> notifications = notificationRepository.findByConfirmation(ConfirmStatus.STILL_NOT_CONFIRMED);
        for(Notification notification : notifications){
            notification.changeStatus();
        }

        //then
        assertThat(user.getNotifications().size()).isEqualTo(3);
        assertThat(user.getNotifications().get(0).getConfirmation()).isEqualTo(ConfirmStatus.CONFIRM);
        assertThat(user.getNotifications().get(1).getConfirmation()).isEqualTo(ConfirmStatus.CONFIRM);
        assertThat(user.getNotifications().get(2).getConfirmation()).isEqualTo(ConfirmStatus.CONFIRM);

        List<FindNotificationResDto> resDtos = notificationQueryRepository.findUnreadNotificationResDtoByUserId(user.getId());
        assertThat(resDtos.size()).isEqualTo(0);
    }

    @Test
    public void testSendMail() throws Exception{
        //given
        SendMailReqDto reqDto = new SendMailReqDto("aldlswjddma@naver.com", "title", "Content");

        //when
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(reqDto.getAddress());
        msg.setSubject(reqDto.getTitle());
        msg.setText(reqDto.getContent());
        javaMailSender.send(msg);
    }

    @Test
    public void testSendScheduledSms() throws Exception{
        //given
        LocalDateTime now = LocalDateTime.now();

        addWorks(now.plusMinutes(1), now.plusHours(1), now);            // 알림 O
        addWorks(now.plusMinutes(29), now.plusHours(1), now.minusMinutes(1)); // 알림 O
        addWorks(now.plusMinutes(40), now.plusHours(1), now.plusMinutes(10)); // 알림 X

        //when
        List<FindWorkByTimeResDto> resDtos = notificationQueryRepository.findScheduleWork();

        for(FindWorkByTimeResDto resDto:resDtos){

            /* 알림 보내기 */
            User findUser = userRepository.findById(resDto.getUserId()).orElseThrow(UserNotFoundException::new);
            DailyWorkSchedule schedule = dailyWorkScheduleRepository.findById(resDto.getDailyWorkId()).orElseThrow(DailyWorkNotFoundException::new);

            Notification notification = Notification.builder()
                    .user(findUser)
                    .type(NotificationType.DAILY_WORK_SCHEDULE)
                    .typeId(resDto.getDailyWorkId())
                    .content(makeContent(schedule.getTitle()))
                    .confirmation(ConfirmStatus.STILL_NOT_CONFIRMED)
                    .build();

            findUser.addNotification(notification);
            schedule.confirm();
        }
        //then
        User findUser = userRepository.findByEmail("cherish8513@naver.com").orElseThrow(UserNotFoundException::new);
        assertThat(findUser.getNotifications().size()).isEqualTo(2);
        assertThat(findUser.getNotifications().get(0).getType()).isEqualTo(NotificationType.DAILY_WORK_SCHEDULE);
        assertThat(findUser.getNotifications().get(0).getTypeId()).isEqualTo(resDtos.get(0).getDailyWorkId());
    }

    private String makeContent(String title) {
        return "["+title+"] 시작이 얼마 남지 않았어요! 일정을 위해 준비해 주세요 :)";
    }


    public void createUser(){
        User user = User.builder()
                .phoneNumber("010-8797-3122")
                .email("cherish8513@naver.com")
                .name("JeongJooHeon")
                .password("1234")
                .role(UserRoleStatus.ROLE_USER)
                .build();

        Schedule schedule = Schedule.builder()
                .build();
        user.changeSchedule(schedule);
        userRepository.save(user);
    }

    private void addWorks(LocalDateTime startDate, LocalDateTime endDate, LocalDateTime alarmDate) {
        User user = userRepository.findByEmail("cherish8513@naver.com").orElseThrow(UserNotFoundException::new);
        DailyWorkSchedule workSchedule = DailyWorkSchedule.builder()
                .content("hard")
                .title("work")
                .startDate(startDate)
                .endDate(endDate)
                .alarmDate(alarmDate)
                .build();
        user.getSchedule().addDailyWork(workSchedule);
    }
    public void createNotification(String content){
        User user = userRepository.findByEmail("cherish8513@naver.com").orElseThrow(UserNotFoundException::new);
        Notification notification = Notification.builder()
                .user(user)
                .type(NotificationType.DAILY_WORK_SCHEDULE)
                .typeId(1L)
                .content(content)
                .confirmation(ConfirmStatus.STILL_NOT_CONFIRMED)
                .build();
        user.addNotification(notification);
    }
    public void createReadNotification(String content){
        User user = userRepository.findByEmail("cherish8513@naver.com").orElseThrow(UserNotFoundException::new);
        Notification notification = Notification.builder()
                .user(user)
                .type(NotificationType.DAILY_WORK_SCHEDULE)
                .typeId(1L)
                .content(content)
                .confirmation(ConfirmStatus.CONFIRM)
                .build();
        user.addNotification(notification);
    }
}