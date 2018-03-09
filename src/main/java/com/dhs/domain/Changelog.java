package com.dhs.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Changelog.
 */
@Entity
@Table(name = "changelog")
public class Changelog implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "modified")
    private Instant modified;

    @ManyToOne
    private User user;

    @ManyToMany(mappedBy = "changelogs")
    @JsonIgnore
    private Set<Article> articles = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getModified() {
        return modified;
    }

    public Changelog modified(Instant modified) {
        this.modified = modified;
        return this;
    }

    public void setModified(Instant modified) {
        this.modified = modified;
    }

    public User getUser() {
        return user;
    }

    public Changelog user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Article> getArticles() {
        return articles;
    }

    public Changelog articles(Set<Article> articles) {
        this.articles = articles;
        return this;
    }

    public Changelog addArticle(Article article) {
        this.articles.add(article);
        article.getChangelogs().add(this);
        return this;
    }

    public Changelog removeArticle(Article article) {
        this.articles.remove(article);
        article.getChangelogs().remove(this);
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
        Changelog changelog = (Changelog) o;
        if (changelog.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), changelog.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Changelog{" +
            "id=" + getId() +
            ", modified='" + getModified() + "'" +
            "}";
    }
}
