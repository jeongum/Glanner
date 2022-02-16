package com.glanner.api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class FindFreeBoardResDto extends FindBoardResDto {
    private int likeCount;
    private int dislikeCount;
    private int commentCount;
    private Long listTotalCount;

    public FindFreeBoardResDto(Long boardId, String userName, String userEmail, String title, String content, int count, LocalDateTime createdDate, int likeCount, int dislikeCount, int commentCount, Long listTotalCount) {
        super(boardId, userName, userEmail, title, content, count, createdDate);
        this.likeCount = likeCount;
        this.dislikeCount = dislikeCount;
        this.commentCount = commentCount;
        this.listTotalCount = listTotalCount;
    }

    public FindFreeBoardResDto(Long boardId, String userName, String userEmail, String title, String content, int count, LocalDateTime createdDate, int likeCount, int dislikeCount, int commentCount) {
        super(boardId, userName, userEmail, title, content, count, createdDate);
        this.likeCount = likeCount;
        this.dislikeCount = dislikeCount;
        this.commentCount = commentCount;
    }
}
