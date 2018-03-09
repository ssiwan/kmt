package com.dhs.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import com.dhs.domain.enumeration.EngineStatus;

/**
 * A DTO for the Engine entity.
 */
public class EngineDTO implements Serializable {

    private Long id;

    @NotNull
    private String number;

    @NotNull
    private EngineStatus status;

    private Set<ArticleDTO> articles = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public EngineStatus getStatus() {
        return status;
    }

    public void setStatus(EngineStatus status) {
        this.status = status;
    }

    public Set<ArticleDTO> getArticles() {
        return articles;
    }

    public void setArticles(Set<ArticleDTO> articles) {
        this.articles = articles;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        EngineDTO engineDTO = (EngineDTO) o;
        if(engineDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), engineDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EngineDTO{" +
            "id=" + getId() +
            ", number='" + getNumber() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
