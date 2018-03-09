package com.dhs.repository;

import com.dhs.domain.Article;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Article entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    @Query("select distinct article from Article article left join fetch article.tags left join fetch article.changelogs")
    List<Article> findAllWithEagerRelationships();

    @Query("select article from Article article left join fetch article.tags left join fetch article.changelogs where article.id =:id")
    Article findOneWithEagerRelationships(@Param("id") Long id);

}
