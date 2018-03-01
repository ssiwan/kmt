package com.dhsynergetech.repository;

import com.dhsynergetech.domain.Changelog;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the Changelog entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChangelogRepository extends JpaRepository<Changelog, Long> {

    @Query("select changelog from Changelog changelog where changelog.user.login = ?#{principal.username}")
    List<Changelog> findByUserIsCurrentUser();

}
