package com.dhs.repository;

import com.dhs.domain.Station;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Station entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StationRepository extends JpaRepository<Station, Long> {
    @Query("select distinct station from Station station left join fetch station.articles left join fetch station.engines")
    List<Station> findAllWithEagerRelationships();

    @Query("select station from Station station left join fetch station.articles left join fetch station.engines where station.id =:id")
    Station findOneWithEagerRelationships(@Param("id") Long id);

}
