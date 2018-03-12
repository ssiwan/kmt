package com.dhs.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Station entity.
 */
public class StationSummaryDTO implements Serializable {

    @NotNull
    private String name;

    @NotNull
    private String county;
 
    private List<String> ready = new ArrayList<String>();
    private List<String> unstaffed = new ArrayList<String>();
    private List<String> outofservice = new ArrayList<String>();
    private List<String> intransit = new ArrayList<String>();
    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCounty() {
        return county;
    }

    public List<String> getReady() {
        return ready;
    }

    public void setReady(List<String> ready){
        this.ready = ready;
    }

    public List<String> getUnstaffed() {
        return unstaffed;
    }

    public void setUnstaffed(List<String> unstaffed){
        this.unstaffed = unstaffed;
    }

    public List<String> getOutofservice() {
        return outofservice;
    }

    public void setOutofservice(List<String> outofservice){
        this.outofservice = outofservice;
    }

    public List<String> getIntransit() {
        return intransit;
    }

    public void setIntransit(List<String> intransit){
        this.intransit = intransit;
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
