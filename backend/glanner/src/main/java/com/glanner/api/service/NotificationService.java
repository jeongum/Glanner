package com.glanner.api.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.glanner.api.dto.request.SendMailReqDto;
import com.glanner.api.dto.request.SendSmsReqDto;
import com.glanner.api.dto.response.FindNotificationResDto;

import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

public interface NotificationService {
    public List<FindNotificationResDto> findAll(String userEmail);
    public List<FindNotificationResDto> findUnread(String userEmail);
    public void modifyStatus(String userEmail);
    public void sendMail(SendMailReqDto reqDto);
    public void sendSms(SendSmsReqDto reqDto);
    public void sendScheduledNoti();
}
