package com.glanner.api.queryrepository;

import com.glanner.api.dto.response.FindFreeBoardResDto;

import java.util.List;
import java.util.Optional;

public interface FreeBoardQueryRepository {
    public Optional<FindFreeBoardResDto> findById(Long id);
    public List<FindFreeBoardResDto> findPage(int offset, int limit);
}
