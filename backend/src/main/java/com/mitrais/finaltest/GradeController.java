package com.mitrais.finaltest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;

/**
 * Created by Bintoro on 4/20/2017.
 */
@RestController
public class GradeController {

    @Autowired
    private GradeRepository repository;

    @RequestMapping(value = "getSingleGrade/{gradeId}", method = RequestMethod.GET)
    ResponseEntity<Grade> getSingleGrade(@PathVariable long gradeId) {
        return new ResponseEntity<>(repository.findOne(gradeId), HttpStatus.OK);
    }
}
