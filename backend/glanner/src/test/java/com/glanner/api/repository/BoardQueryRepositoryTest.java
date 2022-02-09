package com.glanner.api.repository;

import com.glanner.api.queryrepository.FreeBoardQueryRepository;
import com.glanner.api.queryrepository.GlannerBoardQueryRepository;
import com.glanner.api.queryrepository.GroupBoardQueryRepository;
import com.glanner.api.queryrepository.NoticeBoardQueryRepository;
import com.glanner.core.domain.board.FreeBoard;
import com.glanner.core.domain.board.NoticeBoard;
import com.glanner.core.domain.glanner.GroupBoard;
import com.glanner.core.repository.FreeBoardRepository;
import com.glanner.core.repository.GroupBoardRepository;
import com.glanner.core.repository.NoticeBoardRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@SpringBootTest
public class BoardQueryRepositoryTest {
    @Autowired
    FreeBoardRepository freeBoardRepository;
    @Autowired
    NoticeBoardRepository noticeBoardRepository;
    @Autowired
    GroupBoardRepository groupBoardRepository;
    @Autowired
    FreeBoardQueryRepository freeBoardQueryRepository;
    @Autowired
    GlannerBoardQueryRepository glannerBoardQueryRepository;
    @Autowired
    GroupBoardQueryRepository groupBoardQueryRepository;
    @Autowired
    NoticeBoardQueryRepository noticeBoardQueryRepository;

    @Test
    public void testFreeBoard() throws Exception{
        FreeBoard save = freeBoardRepository.save(FreeBoard.boardBuilder().build());
        freeBoardQueryRepository.findById(save.getId());
        freeBoardQueryRepository.findPage(1, 2);
        freeBoardQueryRepository.findPageWithKeyword(1, 2, "a");
    }

    @Test
    public void testNotice() throws Exception{
        NoticeBoard save = noticeBoardRepository.save(NoticeBoard.boardBuilder().build());
        noticeBoardQueryRepository.findById(save.getId());
        noticeBoardQueryRepository.findPage(1, 2);
        noticeBoardQueryRepository.findPageWithKeyword(1, 2, "a");
    }

    @Test
    public void testGroupBoard() throws Exception{
        GroupBoard save = groupBoardRepository.save(GroupBoard.boardBuilder().build());
        groupBoardQueryRepository.findById(save.getId());
        groupBoardQueryRepository.findPage(1, 2);
        groupBoardQueryRepository.findPageWithKeyword(1, 2, "1");
    }
}
