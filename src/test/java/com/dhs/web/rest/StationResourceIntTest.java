package com.dhs.web.rest;

import com.dhs.DhsKnowledgeManagementApp;

import com.dhs.domain.Station;
import com.dhs.repository.StationRepository;
import com.dhs.service.StationService;
import com.dhs.service.dto.StationDTO;
import com.dhs.service.mapper.StationMapper;
import com.dhs.web.rest.errors.ExceptionTranslator;

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

import static com.dhs.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the StationResource REST controller.
 *
 * @see StationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DhsKnowledgeManagementApp.class)
public class StationResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_COUNTY = "AAAAAAAAAA";
    private static final String UPDATED_COUNTY = "BBBBBBBBBB";

    @Autowired
    private StationRepository stationRepository;

    @Autowired
    private StationMapper stationMapper;

    @Autowired
    private StationService stationService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restStationMockMvc;

    private Station station;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StationResource stationResource = new StationResource(stationService);
        this.restStationMockMvc = MockMvcBuilders.standaloneSetup(stationResource)
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
    public static Station createEntity(EntityManager em) {
        Station station = new Station()
            .name(DEFAULT_NAME)
            .county(DEFAULT_COUNTY);
        return station;
    }

    @Before
    public void initTest() {
        station = createEntity(em);
    }

    @Test
    @Transactional
    public void createStation() throws Exception {
        int databaseSizeBeforeCreate = stationRepository.findAll().size();

        // Create the Station
        StationDTO stationDTO = stationMapper.toDto(station);
        restStationMockMvc.perform(post("/api/stations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stationDTO)))
            .andExpect(status().isCreated());

        // Validate the Station in the database
        List<Station> stationList = stationRepository.findAll();
        assertThat(stationList).hasSize(databaseSizeBeforeCreate + 1);
        Station testStation = stationList.get(stationList.size() - 1);
        assertThat(testStation.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testStation.getCounty()).isEqualTo(DEFAULT_COUNTY);
    }

    @Test
    @Transactional
    public void createStationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = stationRepository.findAll().size();

        // Create the Station with an existing ID
        station.setId(1L);
        StationDTO stationDTO = stationMapper.toDto(station);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStationMockMvc.perform(post("/api/stations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stationDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Station in the database
        List<Station> stationList = stationRepository.findAll();
        assertThat(stationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = stationRepository.findAll().size();
        // set the field null
        station.setName(null);

        // Create the Station, which fails.
        StationDTO stationDTO = stationMapper.toDto(station);

        restStationMockMvc.perform(post("/api/stations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stationDTO)))
            .andExpect(status().isBadRequest());

        List<Station> stationList = stationRepository.findAll();
        assertThat(stationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCountyIsRequired() throws Exception {
        int databaseSizeBeforeTest = stationRepository.findAll().size();
        // set the field null
        station.setCounty(null);

        // Create the Station, which fails.
        StationDTO stationDTO = stationMapper.toDto(station);

        restStationMockMvc.perform(post("/api/stations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stationDTO)))
            .andExpect(status().isBadRequest());

        List<Station> stationList = stationRepository.findAll();
        assertThat(stationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllStations() throws Exception {
        // Initialize the database
        stationRepository.saveAndFlush(station);

        // Get all the stationList
        restStationMockMvc.perform(get("/api/stations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(station.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].county").value(hasItem(DEFAULT_COUNTY.toString())));
    }

    @Test
    @Transactional
    public void getStation() throws Exception {
        // Initialize the database
        stationRepository.saveAndFlush(station);

        // Get the station
        restStationMockMvc.perform(get("/api/stations/{id}", station.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(station.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.county").value(DEFAULT_COUNTY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingStation() throws Exception {
        // Get the station
        restStationMockMvc.perform(get("/api/stations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStation() throws Exception {
        // Initialize the database
        stationRepository.saveAndFlush(station);
        int databaseSizeBeforeUpdate = stationRepository.findAll().size();

        // Update the station
        Station updatedStation = stationRepository.findOne(station.getId());
        // Disconnect from session so that the updates on updatedStation are not directly saved in db
        em.detach(updatedStation);
        updatedStation
            .name(UPDATED_NAME)
            .county(UPDATED_COUNTY);
        StationDTO stationDTO = stationMapper.toDto(updatedStation);

        restStationMockMvc.perform(put("/api/stations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stationDTO)))
            .andExpect(status().isOk());

        // Validate the Station in the database
        List<Station> stationList = stationRepository.findAll();
        assertThat(stationList).hasSize(databaseSizeBeforeUpdate);
        Station testStation = stationList.get(stationList.size() - 1);
        assertThat(testStation.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testStation.getCounty()).isEqualTo(UPDATED_COUNTY);
    }

    @Test
    @Transactional
    public void updateNonExistingStation() throws Exception {
        int databaseSizeBeforeUpdate = stationRepository.findAll().size();

        // Create the Station
        StationDTO stationDTO = stationMapper.toDto(station);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restStationMockMvc.perform(put("/api/stations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stationDTO)))
            .andExpect(status().isCreated());

        // Validate the Station in the database
        List<Station> stationList = stationRepository.findAll();
        assertThat(stationList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteStation() throws Exception {
        // Initialize the database
        stationRepository.saveAndFlush(station);
        int databaseSizeBeforeDelete = stationRepository.findAll().size();

        // Get the station
        restStationMockMvc.perform(delete("/api/stations/{id}", station.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Station> stationList = stationRepository.findAll();
        assertThat(stationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Station.class);
        Station station1 = new Station();
        station1.setId(1L);
        Station station2 = new Station();
        station2.setId(station1.getId());
        assertThat(station1).isEqualTo(station2);
        station2.setId(2L);
        assertThat(station1).isNotEqualTo(station2);
        station1.setId(null);
        assertThat(station1).isNotEqualTo(station2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(StationDTO.class);
        StationDTO stationDTO1 = new StationDTO();
        stationDTO1.setId(1L);
        StationDTO stationDTO2 = new StationDTO();
        assertThat(stationDTO1).isNotEqualTo(stationDTO2);
        stationDTO2.setId(stationDTO1.getId());
        assertThat(stationDTO1).isEqualTo(stationDTO2);
        stationDTO2.setId(2L);
        assertThat(stationDTO1).isNotEqualTo(stationDTO2);
        stationDTO1.setId(null);
        assertThat(stationDTO1).isNotEqualTo(stationDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(stationMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(stationMapper.fromId(null)).isNull();
    }
}
