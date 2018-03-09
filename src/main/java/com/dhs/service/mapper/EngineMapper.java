package com.dhs.service.mapper;

import com.dhs.domain.*;
import com.dhs.service.dto.EngineDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Engine and its DTO EngineDTO.
 */
@Mapper(componentModel = "spring", uses = {ArticleMapper.class})
public interface EngineMapper extends EntityMapper<EngineDTO, Engine> {



    default Engine fromId(Long id) {
        if (id == null) {
            return null;
        }
        Engine engine = new Engine();
        engine.setId(id);
        return engine;
    }
}
