package br.com.glic.userservice.services;

import br.com.glic.parent.utils.Utils;
import br.com.glic.userservice.db.UserRepository;
import br.com.glic.userservice.dto.CreateUserRequest;
import br.com.glic.userservice.dto.CreateUserResponse;
import br.com.glic.userservice.enums.AuthTypeEnum;
import br.com.glic.userservice.mappers.UserMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public CreateUserResponse create(CreateUserRequest request) {
        validateMandatoryFields(request);
        userRepository.findByEmail(request.email());
        var entity = userMapper.toEntity(request);
        entity.setPassword(passwordEncoder.encode(entity.getPassword()));
        entity.setProvider(AuthTypeEnum.LOCAL);
        var user = userRepository.save(entity);
        return userMapper.toResponse(user);
    }

    private void validateMandatoryFields(CreateUserRequest request) {
        Utils.validateMandatoryField(request.fullName(), "Full Name");
        Utils.validateMandatoryField(request.email(), "E-mail");
        Utils.validateMandatoryField(request.password(), "Password");
    }
}

