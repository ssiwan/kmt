package com.dhs.service.mapper;

import com.dhs.domain.*;
import com.dhs.service.dto.ArticleDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Article and its DTO ArticleDTO.
 */
@Mapper(componentModel = "spring", uses = {TagMapper.class, ChangelogMapper.class})
public interface ArticleMapper extends EntityMapper<ArticleDTO, Article> {


    @Mapping(target = "stations", ignore = true)
    @Mapping(target = "engines", ignore = true)
    Article toEntity(ArticleDTO articleDTO);

    default Article fromId(Long id) {
        if (id == null) {
            return null;
        }
        Article article = new Article();
        article.setId(id);
        return article;
    }
}
