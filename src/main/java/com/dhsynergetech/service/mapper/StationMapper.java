package com.dhsynergetech.service.mapper;

import com.dhsynergetech.domain.*;
import com.dhsynergetech.service.dto.StationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Station and its DTO StationDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface StationMapper extends EntityMapper<StationDTO, Station> {


    @Mapping(target = "articles", ignore = true)
    Station toEntity(StationDTO stationDTO);

    default Station fromId(Long id) {
        if (id == null) {
            return null;
        }
        Station station = new Station();
        station.setId(id);
        return station;
    }
}
