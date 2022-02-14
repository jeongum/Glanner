package com.glanner.api.queryrepository;

import com.glanner.api.dto.response.FindGlannerBoardResDto;
import com.glanner.api.dto.response.FindGlannerBoardWithCommentsResDto;

import java.util.List;

public interface GlannerBoardQueryRepository {
    public List<FindGlannerBoardResDto> findPage(Long glannerId, int offset, int limit);
    public List<FindGlannerBoardResDto> findPageWithKeyword(Long glannerId, int offset, int limit, String keyword);
}
