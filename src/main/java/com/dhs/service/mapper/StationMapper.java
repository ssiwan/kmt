package com.dhs.service.mapper;

import com.dhs.domain.*;
import com.dhs.service.dto.StationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Station and its DTO StationDTO.
 */
@Mapper(componentModel = "spring", uses = {ArticleMapper.class})
public interface StationMapper extends EntityMapper<StationDTO, Station> {



    default Station fromId(Long id) {
        if (id == null) {
            return null;
        }
        Station station = new Station();
        station.setId(id);
        return station;
    }
}
