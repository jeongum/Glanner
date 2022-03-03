package com.glanner.api.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.glanner.api.dto.request.SendMailReqDto;
import com.glanner.api.dto.request.SendSmsApiReqDto;
import com.glanner.api.dto.request.SendSmsReqDto;
import com.glanner.api.dto.response.FindNotificationResDto;
import com.glanner.api.dto.response.FindWorkByTimeResDto;
import com.glanner.api.dto.response.SendSmsApiResDto;
import com.glanner.api.dto.response.SendSmsResDto;
import com.glanner.api.exception.DailyWorkNotFoundException;
import com.glanner.api.exception.MailNotSentException;
import com.glanner.api.exception.SMSNotSentException;
import com.glanner.api.exception.UserNotFoundException;
import com.glanner.api.queryrepository.NotificationQueryRepository;
import com.glanner.core.domain.glanner.DailyWorkGlanner;
import com.glanner.core.domain.user.*;
import com.glanner.core.repository.DailyWorkGlannerRepository;
import com.glanner.core.repository.DailyWorkScheduleRepository;
import com.glanner.core.repository.NotificationRepository;
import com.glanner.core.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class NotificationServiceImpl implements NotificationService {

    private final JavaMailSender javaMailSender;
    private final UserRepository userRepository;
    private final NotificationRepository notificationRepository;
    private final NotificationQueryRepository notificationQueryRepository;
    private final DailyWorkScheduleRepository dailyWorkScheduleRepository;
    private final DailyWorkGlannerRepository dailyWorkGlannerRepository;

    @Override
    public List<FindNotificationResDto> findAll(String userEmail) {
        User findUser = userRepository.findByEmail(userEmail).orElseThrow(UserNotFoundException::new);
        return notificationQueryRepository.findNotificationResDtoByUserId(findUser.getId());
    }

    @Override
    public List<FindNotificationResDto> findUnread(String userEmail) {
        User findUser = userRepository.findByEmail(userEmail).orElseThrow(UserNotFoundException::new);
        return notificationQueryRepository.findUnreadNotificationResDtoByUserId(findUser.getId());
    }

    @Override
    public void modifyStatus(String userEmail) {
        User findUser = userRepository.findByEmail(userEmail).orElseThrow(UserNotFoundException::new);
        List<Notification> notifications = notificationRepository.findByConfirmation(ConfirmStatus.STILL_NOT_CONFIRMED);
        for(Notification notification : notifications){
            notification.changeStatus();
        }
    }

    @Override
    public void sendMail(SendMailReqDto reqDto) {
        try {
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setTo(reqDto.getAddress());
            msg.setSubject(reqDto.getTitle());
            msg.setText(reqDto.getContent());
            javaMailSender.send(msg);
        } catch (Exception e){
            throw new MailNotSentException();
        }
    }

    @Override
    public void sendScheduledNoti() {
        List<FindWorkByTimeResDto> scheduleResDtos = notificationQueryRepository.findScheduleWork();
        List<FindWorkByTimeResDto> glannerResDtos = notificationQueryRepository.findGlannerWork();
        List<FindWorkByTimeResDto> conferenceResDtos = notificationQueryRepository.findReservedConference();

        sendNotiByType(scheduleResDtos, "schedule");
        sendNotiByType(glannerResDtos, "glanner");
        sendNotiByType(conferenceResDtos, "conference");
    }

    private void sendNotiByType(List<FindWorkByTimeResDto> resDtos, String type) {
        for(FindWorkByTimeResDto resDto:resDtos){
            /* 알림 보내기 */
            if(type.equals("schedule")){
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
            else{
                User findUser = userRepository.findById(resDto.getUserId()).orElseThrow(UserNotFoundException::new);
                DailyWorkGlanner schedule = dailyWorkGlannerRepository.findById(resDto.getDailyWorkId()).orElseThrow(DailyWorkNotFoundException::new);

                Notification notification = Notification.builder()
                        .user(findUser)
                        .type(NotificationType.DAILY_WORK_GLANNER)
                        .typeId(resDto.getDailyWorkId())
                        .content((type.equals("conference"))?makeConferenceContent(schedule.getTitle(), schedule.getGlanner().getId()) : makeContent(schedule.getTitle()))
                        .confirmation(ConfirmStatus.STILL_NOT_CONFIRMED)
                        .build();

                findUser.addNotification(notification);
                schedule.confirm();
            }
        }
    }

    private String makeConferenceContent(String title, Long glannerId) {
        return "["+title+"] 화상회의가 곧 시작합니다! <a href=''> http://i6a606.p.ssafy.io:8080/ </a> 위 링크로 이동해 주세요!";
    }

    private String makeContent(String title) {
        return "["+title+"] 시작이 얼마 남지 않았어요! 일정을 위해 준비해 주세요 :)";
    }
}
