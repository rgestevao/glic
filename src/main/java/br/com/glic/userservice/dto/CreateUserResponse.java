package br.com.glic.userservice.dto;

import java.util.UUID;

public record CreateUserResponse(
        UUID userId,
        String fullName,
        String email
) {
}
