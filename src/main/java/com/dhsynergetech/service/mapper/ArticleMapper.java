package com.dhsynergetech.service.mapper;

import com.dhsynergetech.domain.*;
import com.dhsynergetech.service.dto.ArticleDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Article and its DTO ArticleDTO.
 */
@Mapper(componentModel = "spring", uses = {AttachmentMapper.class, TagMapper.class, StationMapper.class, EngineMapper.class, ChangelogMapper.class})
public interface ArticleMapper extends EntityMapper<ArticleDTO, Article> {



    default Article fromId(Long id) {
        if (id == null) {
            return null;
        }
        Article article = new Article();
        article.setId(id);
        return article;
    }
}
