package com.dhsynergetech.web.rest;

import com.dhsynergetech.DhsKnowledgeManagementApp;

import com.dhsynergetech.domain.Engine;
import com.dhsynergetech.repository.EngineRepository;
import com.dhsynergetech.service.EngineService;
import com.dhsynergetech.service.dto.EngineDTO;
import com.dhsynergetech.service.mapper.EngineMapper;
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
import java.util.List;

import static com.dhsynergetech.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.dhsynergetech.domain.enumeration.EngineStatus;
/**
 * Test class for the EngineResource REST controller.
 *
 * @see EngineResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DhsKnowledgeManagementApp.class)
public class EngineResourceIntTest {

    private static final String DEFAULT_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_NUMBER = "BBBBBBBBBB";

    private static final EngineStatus DEFAULT_STATUS = EngineStatus.READY;
    private static final EngineStatus UPDATED_STATUS = EngineStatus.UNSTAFFED;

    @Autowired
    private EngineRepository engineRepository;

    @Autowired
    private EngineMapper engineMapper;

    @Autowired
    private EngineService engineService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEngineMockMvc;

    private Engine engine;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EngineResource engineResource = new EngineResource(engineService);
        this.restEngineMockMvc = MockMvcBuilders.standaloneSetup(engineResource)
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
    public static Engine createEntity(EntityManager em) {
        Engine engine = new Engine()
            .number(DEFAULT_NUMBER)
            .status(DEFAULT_STATUS);
        return engine;
    }

    @Before
    public void initTest() {
        engine = createEntity(em);
    }

    @Test
    @Transactional
    public void createEngine() throws Exception {
        int databaseSizeBeforeCreate = engineRepository.findAll().size();

        // Create the Engine
        EngineDTO engineDTO = engineMapper.toDto(engine);
        restEngineMockMvc.perform(post("/api/engines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(engineDTO)))
            .andExpect(status().isCreated());

        // Validate the Engine in the database
        List<Engine> engineList = engineRepository.findAll();
        assertThat(engineList).hasSize(databaseSizeBeforeCreate + 1);
        Engine testEngine = engineList.get(engineList.size() - 1);
        assertThat(testEngine.getNumber()).isEqualTo(DEFAULT_NUMBER);
        assertThat(testEngine.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createEngineWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = engineRepository.findAll().size();

        // Create the Engine with an existing ID
        engine.setId(1L);
        EngineDTO engineDTO = engineMapper.toDto(engine);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEngineMockMvc.perform(post("/api/engines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(engineDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Engine in the database
        List<Engine> engineList = engineRepository.findAll();
        assertThat(engineList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = engineRepository.findAll().size();
        // set the field null
        engine.setNumber(null);

        // Create the Engine, which fails.
        EngineDTO engineDTO = engineMapper.toDto(engine);

        restEngineMockMvc.perform(post("/api/engines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(engineDTO)))
            .andExpect(status().isBadRequest());

        List<Engine> engineList = engineRepository.findAll();
        assertThat(engineList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEngines() throws Exception {
        // Initialize the database
        engineRepository.saveAndFlush(engine);

        // Get all the engineList
        restEngineMockMvc.perform(get("/api/engines?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(engine.getId().intValue())))
            .andExpect(jsonPath("$.[*].number").value(hasItem(DEFAULT_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }

    @Test
    @Transactional
    public void getEngine() throws Exception {
        // Initialize the database
        engineRepository.saveAndFlush(engine);

        // Get the engine
        restEngineMockMvc.perform(get("/api/engines/{id}", engine.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(engine.getId().intValue()))
            .andExpect(jsonPath("$.number").value(DEFAULT_NUMBER.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEngine() throws Exception {
        // Get the engine
        restEngineMockMvc.perform(get("/api/engines/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEngine() throws Exception {
        // Initialize the database
        engineRepository.saveAndFlush(engine);
        int databaseSizeBeforeUpdate = engineRepository.findAll().size();

        // Update the engine
        Engine updatedEngine = engineRepository.findOne(engine.getId());
        // Disconnect from session so that the updates on updatedEngine are not directly saved in db
        em.detach(updatedEngine);
        updatedEngine
            .number(UPDATED_NUMBER)
            .status(UPDATED_STATUS);
        EngineDTO engineDTO = engineMapper.toDto(updatedEngine);

        restEngineMockMvc.perform(put("/api/engines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(engineDTO)))
            .andExpect(status().isOk());

        // Validate the Engine in the database
        List<Engine> engineList = engineRepository.findAll();
        assertThat(engineList).hasSize(databaseSizeBeforeUpdate);
        Engine testEngine = engineList.get(engineList.size() - 1);
        assertThat(testEngine.getNumber()).isEqualTo(UPDATED_NUMBER);
        assertThat(testEngine.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingEngine() throws Exception {
        int databaseSizeBeforeUpdate = engineRepository.findAll().size();

        // Create the Engine
        EngineDTO engineDTO = engineMapper.toDto(engine);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEngineMockMvc.perform(put("/api/engines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(engineDTO)))
            .andExpect(status().isCreated());

        // Validate the Engine in the database
        List<Engine> engineList = engineRepository.findAll();
        assertThat(engineList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEngine() throws Exception {
        // Initialize the database
        engineRepository.saveAndFlush(engine);
        int databaseSizeBeforeDelete = engineRepository.findAll().size();

        // Get the engine
        restEngineMockMvc.perform(delete("/api/engines/{id}", engine.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Engine> engineList = engineRepository.findAll();
        assertThat(engineList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Engine.class);
        Engine engine1 = new Engine();
        engine1.setId(1L);
        Engine engine2 = new Engine();
        engine2.setId(engine1.getId());
        assertThat(engine1).isEqualTo(engine2);
        engine2.setId(2L);
        assertThat(engine1).isNotEqualTo(engine2);
        engine1.setId(null);
        assertThat(engine1).isNotEqualTo(engine2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EngineDTO.class);
        EngineDTO engineDTO1 = new EngineDTO();
        engineDTO1.setId(1L);
        EngineDTO engineDTO2 = new EngineDTO();
        assertThat(engineDTO1).isNotEqualTo(engineDTO2);
        engineDTO2.setId(engineDTO1.getId());
        assertThat(engineDTO1).isEqualTo(engineDTO2);
        engineDTO2.setId(2L);
        assertThat(engineDTO1).isNotEqualTo(engineDTO2);
        engineDTO1.setId(null);
        assertThat(engineDTO1).isNotEqualTo(engineDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(engineMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(engineMapper.fromId(null)).isNull();
    }
}
