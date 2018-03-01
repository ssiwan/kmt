package com.dhsynergetech.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dhsynergetech.service.AttachmentService;
import com.dhsynergetech.web.rest.errors.BadRequestAlertException;
import com.dhsynergetech.web.rest.util.HeaderUtil;
import com.dhsynergetech.web.rest.util.PaginationUtil;
import com.dhsynergetech.service.dto.AttachmentDTO;
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
 * REST controller for managing Attachment.
 */
@RestController
@RequestMapping("/api")
public class AttachmentResource {

    private final Logger log = LoggerFactory.getLogger(AttachmentResource.class);

    private static final String ENTITY_NAME = "attachment";

    private final AttachmentService attachmentService;

    public AttachmentResource(AttachmentService attachmentService) {
        this.attachmentService = attachmentService;
    }

    /**
     * POST  /attachments : Create a new attachment.
     *
     * @param attachmentDTO the attachmentDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new attachmentDTO, or with status 400 (Bad Request) if the attachment has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/attachments")
    @Timed
    public ResponseEntity<AttachmentDTO> createAttachment(@RequestBody AttachmentDTO attachmentDTO) throws URISyntaxException {
        log.debug("REST request to save Attachment : {}", attachmentDTO);
        if (attachmentDTO.getId() != null) {
            throw new BadRequestAlertException("A new attachment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AttachmentDTO result = attachmentService.save(attachmentDTO);
        return ResponseEntity.created(new URI("/api/attachments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /attachments : Updates an existing attachment.
     *
     * @param attachmentDTO the attachmentDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated attachmentDTO,
     * or with status 400 (Bad Request) if the attachmentDTO is not valid,
     * or with status 500 (Internal Server Error) if the attachmentDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/attachments")
    @Timed
    public ResponseEntity<AttachmentDTO> updateAttachment(@RequestBody AttachmentDTO attachmentDTO) throws URISyntaxException {
        log.debug("REST request to update Attachment : {}", attachmentDTO);
        if (attachmentDTO.getId() == null) {
            return createAttachment(attachmentDTO);
        }
        AttachmentDTO result = attachmentService.save(attachmentDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, attachmentDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /attachments : get all the attachments.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of attachments in body
     */
    @GetMapping("/attachments")
    @Timed
    public ResponseEntity<List<AttachmentDTO>> getAllAttachments(Pageable pageable) {
        log.debug("REST request to get a page of Attachments");
        Page<AttachmentDTO> page = attachmentService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/attachments");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /attachments/:id : get the "id" attachment.
     *
     * @param id the id of the attachmentDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the attachmentDTO, or with status 404 (Not Found)
     */
    @GetMapping("/attachments/{id}")
    @Timed
    public ResponseEntity<AttachmentDTO> getAttachment(@PathVariable Long id) {
        log.debug("REST request to get Attachment : {}", id);
        AttachmentDTO attachmentDTO = attachmentService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(attachmentDTO));
    }

    /**
     * DELETE  /attachments/:id : delete the "id" attachment.
     *
     * @param id the id of the attachmentDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/attachments/{id}")
    @Timed
    public ResponseEntity<Void> deleteAttachment(@PathVariable Long id) {
        log.debug("REST request to delete Attachment : {}", id);
        attachmentService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
