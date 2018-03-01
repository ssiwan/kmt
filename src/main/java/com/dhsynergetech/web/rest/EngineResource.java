package com.dhsynergetech.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dhsynergetech.service.EngineService;
import com.dhsynergetech.web.rest.errors.BadRequestAlertException;
import com.dhsynergetech.web.rest.util.HeaderUtil;
import com.dhsynergetech.web.rest.util.PaginationUtil;
import com.dhsynergetech.service.dto.EngineDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Engine.
 */
@RestController
@RequestMapping("/api")
public class EngineResource {

    private final Logger log = LoggerFactory.getLogger(EngineResource.class);

    private static final String ENTITY_NAME = "engine";

    private final EngineService engineService;

    public EngineResource(EngineService engineService) {
        this.engineService = engineService;
    }

    /**
     * POST  /engines : Create a new engine.
     *
     * @param engineDTO the engineDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new engineDTO, or with status 400 (Bad Request) if the engine has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/engines")
    @Timed
    public ResponseEntity<EngineDTO> createEngine(@Valid @RequestBody EngineDTO engineDTO) throws URISyntaxException {
        log.debug("REST request to save Engine : {}", engineDTO);
        if (engineDTO.getId() != null) {
            throw new BadRequestAlertException("A new engine cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EngineDTO result = engineService.save(engineDTO);
        return ResponseEntity.created(new URI("/api/engines/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /engines : Updates an existing engine.
     *
     * @param engineDTO the engineDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated engineDTO,
     * or with status 400 (Bad Request) if the engineDTO is not valid,
     * or with status 500 (Internal Server Error) if the engineDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/engines")
    @Timed
    public ResponseEntity<EngineDTO> updateEngine(@Valid @RequestBody EngineDTO engineDTO) throws URISyntaxException {
        log.debug("REST request to update Engine : {}", engineDTO);
        if (engineDTO.getId() == null) {
            return createEngine(engineDTO);
        }
        EngineDTO result = engineService.save(engineDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, engineDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /engines : get all the engines.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of engines in body
     */
    @GetMapping("/engines")
    @Timed
    public ResponseEntity<List<EngineDTO>> getAllEngines(Pageable pageable) {
        log.debug("REST request to get a page of Engines");
        Page<EngineDTO> page = engineService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/engines");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /engines/:id : get the "id" engine.
     *
     * @param id the id of the engineDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the engineDTO, or with status 404 (Not Found)
     */
    @GetMapping("/engines/{id}")
    @Timed
    public ResponseEntity<EngineDTO> getEngine(@PathVariable Long id) {
        log.debug("REST request to get Engine : {}", id);
        EngineDTO engineDTO = engineService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(engineDTO));
    }

    /**
     * DELETE  /engines/:id : delete the "id" engine.
     *
     * @param id the id of the engineDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/engines/{id}")
    @Timed
    public ResponseEntity<Void> deleteEngine(@PathVariable Long id) {
        log.debug("REST request to delete Engine : {}", id);
        engineService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
