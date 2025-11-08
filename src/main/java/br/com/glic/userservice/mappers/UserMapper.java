package br.com.glic.userservice.mappers;

import br.com.glic.userservice.db.UserEntity;
import br.com.glic.userservice.dto.CreateUserRequest;
import br.com.glic.userservice.dto.CreateUserResponse;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {

    UserEntity toEntity(CreateUserRequest request);

    CreateUserResponse toResponse(UserEntity entity);
}
