package com.dhsynergetech.service.mapper;

import com.dhsynergetech.domain.*;
import com.dhsynergetech.service.dto.AttachmentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Attachment and its DTO AttachmentDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface AttachmentMapper extends EntityMapper<AttachmentDTO, Attachment> {


    @Mapping(target = "articles", ignore = true)
    Attachment toEntity(AttachmentDTO attachmentDTO);

    default Attachment fromId(Long id) {
        if (id == null) {
            return null;
        }
        Attachment attachment = new Attachment();
        attachment.setId(id);
        return attachment;
    }
}
