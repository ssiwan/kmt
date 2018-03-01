package com.dhsynergetech.web.rest;

import com.dhsynergetech.DhsKnowledgeManagementApp;

import com.dhsynergetech.domain.Changelog;
import com.dhsynergetech.repository.ChangelogRepository;
import com.dhsynergetech.service.ChangelogService;
import com.dhsynergetech.service.dto.ChangelogDTO;
import com.dhsynergetech.service.mapper.ChangelogMapper;
import com.dhsynergetech.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.dhsynergetech.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ChangelogResource REST controller.
 *
 * @see ChangelogResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DhsKnowledgeManagementApp.class)
public class ChangelogResourceIntTest {

    private static final Instant DEFAULT_MODIFIED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_MODIFIED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private ChangelogRepository changelogRepository;

    @Autowired
    private ChangelogMapper changelogMapper;

    @Autowired
    private ChangelogService changelogService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restChangelogMockMvc;

    private Changelog changelog;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ChangelogResource changelogResource = new ChangelogResource(changelogService);
        this.restChangelogMockMvc = MockMvcBuilders.standaloneSetup(changelogResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Changelog createEntity(EntityManager em) {
        Changelog changelog = new Changelog()
            .modified(DEFAULT_MODIFIED);
        return changelog;
    }

    @Before
    public void initTest() {
        changelog = createEntity(em);
    }

    @Test
    @Transactional
    public void createChangelog() throws Exception {
        int databaseSizeBeforeCreate = changelogRepository.findAll().size();

        // Create the Changelog
        ChangelogDTO changelogDTO = changelogMapper.toDto(changelog);
        restChangelogMockMvc.perform(post("/api/changelogs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(changelogDTO)))
            .andExpect(status().isCreated());

        // Validate the Changelog in the database
        List<Changelog> changelogList = changelogRepository.findAll();
        assertThat(changelogList).hasSize(databaseSizeBeforeCreate + 1);
        Changelog testChangelog = changelogList.get(changelogList.size() - 1);
        assertThat(testChangelog.getModified()).isEqualTo(DEFAULT_MODIFIED);
    }

    @Test
    @Transactional
    public void createChangelogWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = changelogRepository.findAll().size();

        // Create the Changelog with an existing ID
        changelog.setId(1L);
        ChangelogDTO changelogDTO = changelogMapper.toDto(changelog);

        // An entity with an existing ID cannot be created, so this API call must fail
        restChangelogMockMvc.perform(post("/api/changelogs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(changelogDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Changelog in the database
        List<Changelog> changelogList = changelogRepository.findAll();
        assertThat(changelogList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllChangelogs() throws Exception {
        // Initialize the database
        changelogRepository.saveAndFlush(changelog);

        // Get all the changelogList
        restChangelogMockMvc.perform(get("/api/changelogs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(changelog.getId().intValue())))
            .andExpect(jsonPath("$.[*].modified").value(hasItem(DEFAULT_MODIFIED.toString())));
    }

    @Test
    @Transactional
    public void getChangelog() throws Exception {
        // Initialize the database
        changelogRepository.saveAndFlush(changelog);

        // Get the changelog
        restChangelogMockMvc.perform(get("/api/changelogs/{id}", changelog.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(changelog.getId().intValue()))
            .andExpect(jsonPath("$.modified").value(DEFAULT_MODIFIED.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingChangelog() throws Exception {
        // Get the changelog
        restChangelogMockMvc.perform(get("/api/changelogs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateChangelog() throws Exception {
        // Initialize the database
        changelogRepository.saveAndFlush(changelog);
        int databaseSizeBeforeUpdate = changelogRepository.findAll().size();

        // Update the changelog
        Changelog updatedChangelog = changelogRepository.findOne(changelog.getId());
        // Disconnect from session so that the updates on updatedChangelog are not directly saved in db
        em.detach(updatedChangelog);
        updatedChangelog
            .modified(UPDATED_MODIFIED);
        ChangelogDTO changelogDTO = changelogMapper.toDto(updatedChangelog);

        restChangelogMockMvc.perform(put("/api/changelogs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(changelogDTO)))
            .andExpect(status().isOk());

        // Validate the Changelog in the database
        List<Changelog> changelogList = changelogRepository.findAll();
        assertThat(changelogList).hasSize(databaseSizeBeforeUpdate);
        Changelog testChangelog = changelogList.get(changelogList.size() - 1);
        assertThat(testChangelog.getModified()).isEqualTo(UPDATED_MODIFIED);
    }

    @Test
    @Transactional
    public void updateNonExistingChangelog() throws Exception {
        int databaseSizeBeforeUpdate = changelogRepository.findAll().size();

        // Create the Changelog
        ChangelogDTO changelogDTO = changelogMapper.toDto(changelog);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restChangelogMockMvc.perform(put("/api/changelogs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(changelogDTO)))
            .andExpect(status().isCreated());

        // Validate the Changelog in the database
        List<Changelog> changelogList = changelogRepository.findAll();
        assertThat(changelogList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteChangelog() throws Exception {
        // Initialize the database
        changelogRepository.saveAndFlush(changelog);
        int databaseSizeBeforeDelete = changelogRepository.findAll().size();

        // Get the changelog
        restChangelogMockMvc.perform(delete("/api/changelogs/{id}", changelog.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Changelog> changelogList = changelogRepository.findAll();
        assertThat(changelogList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Changelog.class);
        Changelog changelog1 = new Changelog();
        changelog1.setId(1L);
        Changelog changelog2 = new Changelog();
        changelog2.setId(changelog1.getId());
        assertThat(changelog1).isEqualTo(changelog2);
        changelog2.setId(2L);
        assertThat(changelog1).isNotEqualTo(changelog2);
        changelog1.setId(null);
        assertThat(changelog1).isNotEqualTo(changelog2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ChangelogDTO.class);
        ChangelogDTO changelogDTO1 = new ChangelogDTO();
        changelogDTO1.setId(1L);
        ChangelogDTO changelogDTO2 = new ChangelogDTO();
        assertThat(changelogDTO1).isNotEqualTo(changelogDTO2);
        changelogDTO2.setId(changelogDTO1.getId());
        assertThat(changelogDTO1).isEqualTo(changelogDTO2);
        changelogDTO2.setId(2L);
        assertThat(changelogDTO1).isNotEqualTo(changelogDTO2);
        changelogDTO1.setId(null);
        assertThat(changelogDTO1).isNotEqualTo(changelogDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(changelogMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(changelogMapper.fromId(null)).isNull();
    }
}
