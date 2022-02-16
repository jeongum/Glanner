package com.glanner.api.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
public class FindNoticeBoardResDto extends FindBoardResDto {
    private int commentCount;
    private Long listTotalCount;

    public FindNoticeBoardResDto(Long boardId, String userName, String userEmail, String title, String content, int count, LocalDateTime createdDate, int commentCount, Long listTotalCount) {
        super(boardId, userName, userEmail, title, content, count, createdDate);
        this.commentCount = commentCount;
        this.listTotalCount = listTotalCount;
    }
    public FindNoticeBoardResDto(Long boardId, String userName, String userEmail, String title, String content, int count, LocalDateTime createdDate, int commentCount) {
        super(boardId, userName, userEmail, title, content, count, createdDate);
        this.commentCount = commentCount;
    }
}
