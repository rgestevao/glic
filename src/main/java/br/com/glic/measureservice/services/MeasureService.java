package br.com.glic.measureservice.services;

import br.com.glic.measureservice.db.MeasureEntity;
import br.com.glic.measureservice.db.MeasureRepository;
import br.com.glic.measureservice.dto.CreateMeasureRequest;
import br.com.glic.measureservice.dto.DeleteMeasureRequest;
import br.com.glic.measureservice.dto.MeasureResponse;
import br.com.glic.measureservice.dto.UpdateMeasureRequest;
import br.com.glic.measureservice.enums.MeasureStatusEnum;
import br.com.glic.measureservice.mappers.MeasureMapper;
import br.com.glic.parent.exceptions.GenericException;
import br.com.glic.userservice.db.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;

@Service
@RequiredArgsConstructor
public class MeasureService {

    private final MeasureRepository measureRepository;
    private final UserRepository userRepository;
    private final MeasureMapper measureMapper;

    @Transactional
    public MeasureResponse create(CreateMeasureRequest request) {
        var user = userRepository.findById(request.userId()).orElseThrow(() -> new GenericException(
                HttpStatus.BAD_REQUEST,
                "User not found",
                OffsetDateTime.now()
        ));
        var measureEntity = new MeasureEntity();
        measureEntity.setDateCreation(OffsetDateTime.now());
        measureEntity.setValue(request.value());
        measureEntity.setUser(user);
        measureEntity.setStatus(mapMeasureStatus(request.value()));
        var measure = measureRepository.save(measureEntity);
        return measureMapper.toResponse(measure);
    }

    @Transactional
    public MeasureResponse update(UpdateMeasureRequest request) {
        var measure = measureRepository.findById(request.measureId()).orElseThrow(() -> new GenericException(
                HttpStatus.BAD_REQUEST,
                "Measure not found",
                OffsetDateTime.now()
        ));
        var user = userRepository.findById(request.userId()).orElseThrow(() -> new GenericException(
                HttpStatus.BAD_REQUEST,
                "User not found",
                OffsetDateTime.now()
        ));
        measure.setDateCreation(request.offsetDateTime());
        measure.setValue(request.value());
        measure.setUser(user);
        measure.setStatus(mapMeasureStatus(request.value()));
        var measureSaved = measureRepository.save(measure);
        return measureMapper.toResponse(measureSaved);
    }

    private MeasureStatusEnum mapMeasureStatus(Integer value) {
        if (value == null) {
            throw new GenericException(
                    HttpStatus.BAD_REQUEST,
                    "Value cannot be null or empty",
                    OffsetDateTime.now()
            );
        }
        if (value < 70) return MeasureStatusEnum.LOW;
        if (value < 180) return MeasureStatusEnum.NORMAL;
        return MeasureStatusEnum.HIGH;
    }

    public void delete(DeleteMeasureRequest request) {
        var measure = measureRepository.findById(request.measureId()).orElseThrow(() -> new GenericException(
                HttpStatus.BAD_REQUEST,
                "Measure not found",
                OffsetDateTime.now()
        ));
        userRepository.findById(request.userId()).orElseThrow(() -> new GenericException(
                HttpStatus.BAD_REQUEST,
                "User not found",
                OffsetDateTime.now()
        ));
        measureRepository.deleteById(measure.getMeasureId());
    }
}
