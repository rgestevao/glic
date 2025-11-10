package br.com.glic.measureservice.api;

import br.com.glic.measureservice.dto.CreateMeasureRequest;
import br.com.glic.measureservice.dto.MeasureResponse;
import br.com.glic.measureservice.dto.UpdateMeasureRequest;
import br.com.glic.measureservice.services.MeasureService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/measures")
public class MeasureController {

    private final MeasureService measureService;

    @PostMapping
    public ResponseEntity<MeasureResponse> create(@Valid @RequestBody CreateMeasureRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(measureService.create(request));
    }

    @PutMapping
    public ResponseEntity<MeasureResponse> update(@Valid @RequestBody UpdateMeasureRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(measureService.update(request));
    }
}
