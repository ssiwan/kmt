package com.dhs.service.mapper;

import com.dhs.domain.*;
import com.dhs.service.dto.ChangelogDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Changelog and its DTO ChangelogDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface ChangelogMapper extends EntityMapper<ChangelogDTO, Changelog> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.login", target = "userLogin")
    ChangelogDTO toDto(Changelog changelog);

    @Mapping(source = "userId", target = "user")
    @Mapping(target = "articles", ignore = true)
    Changelog toEntity(ChangelogDTO changelogDTO);

    default Changelog fromId(Long id) {
        if (id == null) {
            return null;
        }
        Changelog changelog = new Changelog();
        changelog.setId(id);
        return changelog;
    }
}
