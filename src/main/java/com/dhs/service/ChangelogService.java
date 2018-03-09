package com.dhs.service;

import com.dhs.domain.Changelog;
import com.dhs.repository.ChangelogRepository;
import com.dhs.service.dto.ChangelogDTO;
import com.dhs.service.mapper.ChangelogMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Changelog.
 */
@Service
@Transactional
public class ChangelogService {

    private final Logger log = LoggerFactory.getLogger(ChangelogService.class);

    private final ChangelogRepository changelogRepository;

    private final ChangelogMapper changelogMapper;

    public ChangelogService(ChangelogRepository changelogRepository, ChangelogMapper changelogMapper) {
        this.changelogRepository = changelogRepository;
        this.changelogMapper = changelogMapper;
    }

    /**
     * Save a changelog.
     *
     * @param changelogDTO the entity to save
     * @return the persisted entity
     */
    public ChangelogDTO save(ChangelogDTO changelogDTO) {
        log.debug("Request to save Changelog : {}", changelogDTO);
        Changelog changelog = changelogMapper.toEntity(changelogDTO);
        changelog = changelogRepository.save(changelog);
        return changelogMapper.toDto(changelog);
    }

    /**
     * Get all the changelogs.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ChangelogDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Changelogs");
        return changelogRepository.findAll(pageable)
            .map(changelogMapper::toDto);
    }

    /**
     * Get one changelog by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public ChangelogDTO findOne(Long id) {
        log.debug("Request to get Changelog : {}", id);
        Changelog changelog = changelogRepository.findOne(id);
        return changelogMapper.toDto(changelog);
    }

    /**
     * Delete the changelog by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Changelog : {}", id);
        changelogRepository.delete(id);
    }
}
