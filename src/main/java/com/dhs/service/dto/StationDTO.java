package com.dhs.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Station entity.
 */
public class StationDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String county;

    private Set<ArticleDTO> articles = new HashSet<>();

    private Set<EngineDTO> engines = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCounty() {
        return county;
    }

    public void setCounty(String county) {
        this.county = county;
    }

    public Set<ArticleDTO> getArticles() {
        return articles;
    }

    public void setArticles(Set<ArticleDTO> articles) {
        this.articles = articles;
    }

    public Set<EngineDTO> getEngines() {
        return engines;
    }

    public void setEngines(Set<EngineDTO> engines) {
        this.engines = engines;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        StationDTO stationDTO = (StationDTO) o;
        if(stationDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), stationDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StationDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", county='" + getCounty() + "'" +
            "}";
    }
}
