package com.glanner.api.queryrepository;

import com.glanner.api.dto.request.SearchBoardReqDto;
import com.glanner.api.dto.response.FindGroupBoardResDto;

import java.util.List;
import java.util.Optional;

public interface GroupBoardQueryRepository {
    public Optional<FindGroupBoardResDto> findById(Long id);
    public List<FindGroupBoardResDto> findPage(int offset, int limit);
    public List<FindGroupBoardResDto> findPageWithKeyword(int offset, int limit, String keyword);
    public List<FindGroupBoardResDto> findPageWithInterest(int offset, int limit, String interest);
}
