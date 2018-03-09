package com.dhs.repository;

import com.dhs.domain.Engine;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Engine entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EngineRepository extends JpaRepository<Engine, Long> {
    @Query("select distinct engine from Engine engine left join fetch engine.articles")
    List<Engine> findAllWithEagerRelationships();

    @Query("select engine from Engine engine left join fetch engine.articles where engine.id =:id")
    Engine findOneWithEagerRelationships(@Param("id") Long id);

}
