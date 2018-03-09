package com.dhs.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Station.
 */
@Entity
@Table(name = "station")
public class Station implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "county", nullable = false)
    private String county;

    @ManyToMany
    @JoinTable(name = "station_article",
               joinColumns = @JoinColumn(name="stations_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="articles_id", referencedColumnName="id"))
    private Set<Article> articles = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Station name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCounty() {
        return county;
    }

    public Station county(String county) {
        this.county = county;
        return this;
    }

    public void setCounty(String county) {
        this.county = county;
    }

    public Set<Article> getArticles() {
        return articles;
    }

    public Station articles(Set<Article> articles) {
        this.articles = articles;
        return this;
    }

    public Station addArticle(Article article) {
        this.articles.add(article);
        article.getStations().add(this);
        return this;
    }

    public Station removeArticle(Article article) {
        this.articles.remove(article);
        article.getStations().remove(this);
        return this;
    }

    public void setArticles(Set<Article> articles) {
        this.articles = articles;
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
        Station station = (Station) o;
        if (station.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), station.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Station{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", county='" + getCounty() + "'" +
            "}";
    }
}
