package com.dhsynergetech.service.mapper;

import com.dhsynergetech.domain.*;
import com.dhsynergetech.service.dto.EngineDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Engine and its DTO EngineDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface EngineMapper extends EntityMapper<EngineDTO, Engine> {


    @Mapping(target = "articles", ignore = true)
    Engine toEntity(EngineDTO engineDTO);

    default Engine fromId(Long id) {
        if (id == null) {
            return null;
        }
        Engine engine = new Engine();
        engine.setId(id);
        return engine;
    }
}
