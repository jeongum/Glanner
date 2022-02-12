package com.glanner.api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class FindGroupBoardResDto extends FindBoardResDto {
    private String interests;
    private int commentCount;

    public FindGroupBoardResDto(Long boardId, String userName, String title, String content, int count, LocalDateTime createdDate, String interests, int commentCount) {
        super(boardId, userName, title, content, count, createdDate);
        this.interests = interests;
        this.commentCount = commentCount;
    }
}
