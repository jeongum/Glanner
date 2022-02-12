package com.glanner.api.dto.response;

import com.glanner.core.domain.glanner.Glanner;
import com.glanner.core.domain.glanner.UserGlanner;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class FindGlannerResDto {
    Long glannerId;
    String hostEmail;
    String glannerName;
    int numOfMember;
    Map<String, String> membersInfo;

    public FindGlannerResDto(Glanner glanner, List<UserGlanner> userGlanners){
        glannerId = glanner.getId();
        hostEmail = glanner.getHost().getEmail();
        glannerName = glanner.getName();
        numOfMember = userGlanners.size();
        membersInfo = userGlanners.stream().collect(Collectors.toMap(
           u -> u.getUser().getEmail(),
           u -> u.getUser().getName()
        ));
    }
}
