package com.dhs.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.dhs.domain.enumeration.ArticleStatus;

/**
 * A Article.
 */
@Entity
@Table(name = "article")
public class Article implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @NotNull
    @Lob
    @Column(name = "content", nullable = false)
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private ArticleStatus status;

    @ManyToMany
    @JoinTable(name = "article_tag",
               joinColumns = @JoinColumn(name="articles_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="tags_id", referencedColumnName="id"))
    private Set<Tag> tags = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "article_changelog",
               joinColumns = @JoinColumn(name="articles_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="changelogs_id", referencedColumnName="id"))
    private Set<Changelog> changelogs = new HashSet<>();

    @ManyToMany(mappedBy = "articles")
    @JsonIgnore
    private Set<Station> stations = new HashSet<>();

    @ManyToMany(mappedBy = "articles")
    @JsonIgnore
    private Set<Engine> engines = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Article title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public Article content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public ArticleStatus getStatus() {
        return status;
    }

    public Article status(ArticleStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(ArticleStatus status) {
        this.status = status;
    }

    public Set<Tag> getTags() {
        return tags;
    }

    public Article tags(Set<Tag> tags) {
        this.tags = tags;
        return this;
    }

    public Article addTag(Tag tag) {
        this.tags.add(tag);
        tag.getArticles().add(this);
        return this;
    }

    public Article removeTag(Tag tag) {
        this.tags.remove(tag);
        tag.getArticles().remove(this);
        return this;
    }

    public void setTags(Set<Tag> tags) {
        this.tags = tags;
    }

    public Set<Changelog> getChangelogs() {
        return changelogs;
    }

    public Article changelogs(Set<Changelog> changelogs) {
        this.changelogs = changelogs;
        return this;
    }

    public Article addChangelog(Changelog changelog) {
        this.changelogs.add(changelog);
        changelog.getArticles().add(this);
        return this;
    }

    public Article removeChangelog(Changelog changelog) {
        this.changelogs.remove(changelog);
        changelog.getArticles().remove(this);
        return this;
    }

    public void setChangelogs(Set<Changelog> changelogs) {
        this.changelogs = changelogs;
    }

    public Set<Station> getStations() {
        return stations;
    }

    public Article stations(Set<Station> stations) {
        this.stations = stations;
        return this;
    }

    public Article addStation(Station station) {
        this.stations.add(station);
        station.getArticles().add(this);
        return this;
    }

    public Article removeStation(Station station) {
        this.stations.remove(station);
        station.getArticles().remove(this);
        return this;
    }

    public void setStations(Set<Station> stations) {
        this.stations = stations;
    }

    public Set<Engine> getEngines() {
        return engines;
    }

    public Article engines(Set<Engine> engines) {
        this.engines = engines;
        return this;
    }

    public Article addEngine(Engine engine) {
        this.engines.add(engine);
        engine.getArticles().add(this);
        return this;
    }

    public Article removeEngine(Engine engine) {
        this.engines.remove(engine);
        engine.getArticles().remove(this);
        return this;
    }

    public void setEngines(Set<Engine> engines) {
        this.engines = engines;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Article article = (Article) o;
        if (article.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), article.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Article{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", content='" + getContent() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
