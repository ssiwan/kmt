package com.dhsynergetech.service;

import com.dhsynergetech.domain.Station;
import com.dhsynergetech.repository.StationRepository;
import com.dhsynergetech.service.dto.StationDTO;
import com.dhsynergetech.service.mapper.StationMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Station.
 */
@Service
@Transactional
public class StationService {

    private final Logger log = LoggerFactory.getLogger(StationService.class);

    private final StationRepository stationRepository;

    private final StationMapper stationMapper;

    public StationService(StationRepository stationRepository, StationMapper stationMapper) {
        this.stationRepository = stationRepository;
        this.stationMapper = stationMapper;
    }

    /**
     * Save a station.
     *
     * @param stationDTO the entity to save
     * @return the persisted entity
     */
    public StationDTO save(StationDTO stationDTO) {
        log.debug("Request to save Station : {}", stationDTO);
        Station station = stationMapper.toEntity(stationDTO);
        station = stationRepository.save(station);
        return stationMapper.toDto(station);
    }

    /**
     * Get all the stations.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<StationDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Stations");
        return stationRepository.findAll(pageable)
            .map(stationMapper::toDto);
    }

    /**
     * Get one station by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public StationDTO findOne(Long id) {
        log.debug("Request to get Station : {}", id);
        Station station = stationRepository.findOne(id);
        return stationMapper.toDto(station);
    }

    /**
     * Delete the station by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Station : {}", id);
        stationRepository.delete(id);
    }
}
