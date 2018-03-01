package com.dhsynergetech.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import javax.persistence.Lob;
import com.dhsynergetech.domain.enumeration.ArticleStatus;

/**
 * A DTO for the Article entity.
 */
public class ArticleDTO implements Serializable {

    private Long id;

    @NotNull
    private String title;

    @Lob
    private String detail;

    private String preview;

    private ArticleStatus status;

    private Set<AttachmentDTO> attachments = new HashSet<>();

    private Set<TagDTO> tags = new HashSet<>();

    private Set<StationDTO> stations = new HashSet<>();

    private Set<EngineDTO> engines = new HashSet<>();

    private Set<ChangelogDTO> changelogs = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public String getPreview() {
        return preview;
    }

    public void setPreview(String preview) {
        this.preview = preview;
    }

    public ArticleStatus getStatus() {
        return status;
    }

    public void setStatus(ArticleStatus status) {
        this.status = status;
    }

    public Set<AttachmentDTO> getAttachments() {
        return attachments;
    }

    public void setAttachments(Set<AttachmentDTO> attachments) {
        this.attachments = attachments;
    }

    public Set<TagDTO> getTags() {
        return tags;
    }

    public void setTags(Set<TagDTO> tags) {
        this.tags = tags;
    }

    public Set<StationDTO> getStations() {
        return stations;
    }

    public void setStations(Set<StationDTO> stations) {
        this.stations = stations;
    }

    public Set<EngineDTO> getEngines() {
        return engines;
    }

    public void setEngines(Set<EngineDTO> engines) {
        this.engines = engines;
    }

    public Set<ChangelogDTO> getChangelogs() {
        return changelogs;
    }

    public void setChangelogs(Set<ChangelogDTO> changelogs) {
        this.changelogs = changelogs;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ArticleDTO articleDTO = (ArticleDTO) o;
        if(articleDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), articleDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ArticleDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", detail='" + getDetail() + "'" +
            ", preview='" + getPreview() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
