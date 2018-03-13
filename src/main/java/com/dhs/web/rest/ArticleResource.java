package com.dhs.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dhs.domain.User;
import com.dhs.domain.enumeration.ArticleStatus;
import com.dhs.security.SecurityUtils;
import com.dhs.service.ArticleService;
import com.dhs.service.ChangelogService;
import com.dhs.service.MailService;
import com.dhs.service.UserService;
import com.dhs.web.rest.errors.BadRequestAlertException;
import com.dhs.web.rest.util.HeaderUtil;
import com.dhs.web.rest.util.PaginationUtil;
import com.dhs.service.dto.ArticleDTO;
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

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Article.
 */
@RestController
@RequestMapping("/api")
public class ArticleResource {

    private final Logger log = LoggerFactory.getLogger(ArticleResource.class);

    private static final String ENTITY_NAME = "article";

    private final ArticleService articleService;

    private final ChangelogService changeLogService;

    private final UserService userService;

    private final MailService mailService;

    public ArticleResource(ArticleService articleService, ChangelogService changeLogService, 
        UserService userService, MailService mailService) {
        this.articleService = articleService;
        this.changeLogService = changeLogService;
        this.userService = userService;
        this.mailService = mailService;
    }

    /**
     * POST  /articles : Create a new article.
     *
     * @param articleDTO the articleDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new articleDTO, or with status 400 (Bad Request) if the article has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/articles")
    @Timed
    public ResponseEntity<ArticleDTO> createArticle(@Valid @RequestBody ArticleDTO articleDTO) throws URISyntaxException {
        log.debug("REST request to save Article : {}", articleDTO);
        if (articleDTO.getId() != null) {
            throw new BadRequestAlertException("A new article cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ChangelogDTO changeLog = new ChangelogDTO();
        changeLog.setModified(Instant.now());
        changeLog.setUserId(userService.getUserWithAuthoritiesByLogin(SecurityUtils.getCurrentUserLogin().orElse("")).orElse(null).getId());
        articleDTO.getChangelogs().add(changeLogService.save(changeLog));
        articleDTO.setStatus(ArticleStatus.DRAFT);
        ArticleDTO result = articleService.save(articleDTO);
        List<User> captains = userService.findAllCaptains();
        
        mailService.sendArticleCreationEmail(result, captains);
        return ResponseEntity.created(new URI("/api/articles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /articles : Updates an existing article.
     *
     * @param articleDTO the articleDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated articleDTO,
     * or with status 400 (Bad Request) if the articleDTO is not valid,
     * or with status 500 (Internal Server Error) if the articleDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/articles")
    @Timed
    public ResponseEntity<ArticleDTO> updateArticle(@Valid @RequestBody ArticleDTO articleDTO) throws URISyntaxException {
        log.debug("REST request to update Article : {}", articleDTO);
        if (articleDTO.getId() == null) {
            return createArticle(articleDTO);
        }
        ChangelogDTO changeLog = new ChangelogDTO();
        changeLog.setModified(Instant.now());
        changeLog.setUserId(userService.getUserWithAuthoritiesByLogin(SecurityUtils.getCurrentUserLogin().orElse("")).orElse(null).getId());
        articleDTO.getChangelogs().add(changeLogService.save(changeLog));

        ArticleDTO result = articleService.save(articleDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, articleDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /articles : get all the articles.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of articles in body
     */
    @GetMapping("/articles")
    @Timed
    public ResponseEntity<List<ArticleDTO>> getAllArticles(Pageable pageable) {
        log.debug("REST request to get a page of Articles");
        Page<ArticleDTO> page = articleService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/articles");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /articles/:id : get the "id" article.
     *
     * @param id the id of the articleDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the articleDTO, or with status 404 (Not Found)
     */
    @GetMapping("/articles/{id}")
    @Timed
    public ResponseEntity<ArticleDTO> getArticle(@PathVariable Long id) {
        log.debug("REST request to get Article : {}", id);
        ArticleDTO articleDTO = articleService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(articleDTO));
    }

    /**
     * DELETE  /articles/:id : delete the "id" article.
     *
     * @param id the id of the articleDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/articles/{id}")
    @Timed
    public ResponseEntity<Void> deleteArticle(@PathVariable Long id) {
        log.debug("REST request to delete Article : {}", id);
        articleService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
