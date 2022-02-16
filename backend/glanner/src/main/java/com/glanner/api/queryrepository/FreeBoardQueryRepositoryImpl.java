package com.glanner.api.queryrepository;

import com.glanner.api.dto.response.FindFreeBoardResDto;
import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.glanner.core.domain.board.QFreeBoard.freeBoard;
import static com.querydsl.core.types.ExpressionUtils.count;

@Repository
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FreeBoardQueryRepositoryImpl implements FreeBoardQueryRepository{

    private final JPAQueryFactory query;

    @Override
    public List<FindFreeBoardResDto> findPage(int offset, int limit) {
        return query
                .select(Projections.constructor(FindFreeBoardResDto.class,
                        freeBoard.id,
                        freeBoard.user.name,
                        freeBoard.user.email,
                        freeBoard.title,
                        freeBoard.content,
                        freeBoard.count,
                        freeBoard.createdDate,
                        freeBoard.likeCount,
                        freeBoard.dislikeCount,
                        freeBoard.comments.size(),
                        ExpressionUtils.as(
                                JPAExpressions.select(count(freeBoard.id))
                                        .from(freeBoard),
                                "listTotalCount")))
                .from(freeBoard)
                .orderBy(freeBoard.createdDate.desc())
                .offset(offset)
                .limit(limit)
                .fetch();
    }

    @Override
    public List<FindFreeBoardResDto> findPageWithKeyword(int offset, int limit, String keyword) {
        return query
                .select(Projections.constructor(FindFreeBoardResDto.class,
                        freeBoard.id,
                        freeBoard.user.name,
                        freeBoard.user.email,
                        freeBoard.title,
                        freeBoard.content,
                        freeBoard.count,
                        freeBoard.createdDate,
                        freeBoard.likeCount,
                        freeBoard.dislikeCount,
                        freeBoard.comments.size()))
                .from(freeBoard)
                .where(freeBoard.title.contains(keyword)
                        .or(freeBoard.content.contains(keyword)))
                .orderBy(freeBoard.createdDate.desc())
                .offset(offset)
                .limit(limit)
                .fetch();
    }
}
