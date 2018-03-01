package com.dhsynergetech.service;

import com.dhsynergetech.domain.Engine;
import com.dhsynergetech.repository.EngineRepository;
import com.dhsynergetech.service.dto.EngineDTO;
import com.dhsynergetech.service.mapper.EngineMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Engine.
 */
@Service
@Transactional
public class EngineService {

    private final Logger log = LoggerFactory.getLogger(EngineService.class);

    private final EngineRepository engineRepository;

    private final EngineMapper engineMapper;

    public EngineService(EngineRepository engineRepository, EngineMapper engineMapper) {
        this.engineRepository = engineRepository;
        this.engineMapper = engineMapper;
    }

    /**
     * Save a engine.
     *
     * @param engineDTO the entity to save
     * @return the persisted entity
     */
    public EngineDTO save(EngineDTO engineDTO) {
        log.debug("Request to save Engine : {}", engineDTO);
        Engine engine = engineMapper.toEntity(engineDTO);
        engine = engineRepository.save(engine);
        return engineMapper.toDto(engine);
    }

    /**
     * Get all the engines.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<EngineDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Engines");
        return engineRepository.findAll(pageable)
            .map(engineMapper::toDto);
    }

    /**
     * Get one engine by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public EngineDTO findOne(Long id) {
        log.debug("Request to get Engine : {}", id);
        Engine engine = engineRepository.findOne(id);
        return engineMapper.toDto(engine);
    }

    /**
     * Delete the engine by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Engine : {}", id);
        engineRepository.delete(id);
    }
}
