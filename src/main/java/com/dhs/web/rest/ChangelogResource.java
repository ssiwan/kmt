package com.dhs.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dhs.service.ChangelogService;
import com.dhs.web.rest.errors.BadRequestAlertException;
import com.dhs.web.rest.util.HeaderUtil;
import com.dhs.web.rest.util.PaginationUtil;
import com.dhs.service.dto.ChangelogDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Changelog.
 */
@RestController
@RequestMapping("/api")
public class ChangelogResource {

    private final Logger log = LoggerFactory.getLogger(ChangelogResource.class);

    private static final String ENTITY_NAME = "changelog";

    private final ChangelogService changelogService;

    public ChangelogResource(ChangelogService changelogService) {
        this.changelogService = changelogService;
    }

    /**
     * POST  /changelogs : Create a new changelog.
     *
     * @param changelogDTO the changelogDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new changelogDTO, or with status 400 (Bad Request) if the changelog has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/changelogs")
    @Timed
    public ResponseEntity<ChangelogDTO> createChangelog(@RequestBody ChangelogDTO changelogDTO) throws URISyntaxException {
        log.debug("REST request to save Changelog : {}", changelogDTO);
        if (changelogDTO.getId() != null) {
            throw new BadRequestAlertException("A new changelog cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ChangelogDTO result = changelogService.save(changelogDTO);
        return ResponseEntity.created(new URI("/api/changelogs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /changelogs : Updates an existing changelog.
     *
     * @param changelogDTO the changelogDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated changelogDTO,
     * or with status 400 (Bad Request) if the changelogDTO is not valid,
     * or with status 500 (Internal Server Error) if the changelogDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/changelogs")
    @Timed
    public ResponseEntity<ChangelogDTO> updateChangelog(@RequestBody ChangelogDTO changelogDTO) throws URISyntaxException {
        log.debug("REST request to update Changelog : {}", changelogDTO);
        if (changelogDTO.getId() == null) {
            return createChangelog(changelogDTO);
        }
        ChangelogDTO result = changelogService.save(changelogDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, changelogDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /changelogs : get all the changelogs.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of changelogs in body
     */
    @GetMapping("/changelogs")
    @Timed
    public ResponseEntity<List<ChangelogDTO>> getAllChangelogs(Pageable pageable) {
        log.debug("REST request to get a page of Changelogs");
        Page<ChangelogDTO> page = changelogService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/changelogs");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /changelogs/:id : get the "id" changelog.
     *
     * @param id the id of the changelogDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the changelogDTO, or with status 404 (Not Found)
     */
    @GetMapping("/changelogs/{id}")
    @Timed
    public ResponseEntity<ChangelogDTO> getChangelog(@PathVariable Long id) {
        log.debug("REST request to get Changelog : {}", id);
        ChangelogDTO changelogDTO = changelogService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(changelogDTO));
    }

    /**
     * DELETE  /changelogs/:id : delete the "id" changelog.
     *
     * @param id the id of the changelogDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/changelogs/{id}")
    @Timed
    public ResponseEntity<Void> deleteChangelog(@PathVariable Long id) {
        log.debug("REST request to delete Changelog : {}", id);
        changelogService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
