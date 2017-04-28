package com.mitrais.finaltest.division;

import com.mitrais.finaltest.grade.Grade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Created by Bintoro on 4/20/2017.
 */
@RestController
public class DivisionController {

    @Autowired
    private DivisionRepository repository;

    @RequestMapping(value = "getDivisions", method = RequestMethod.GET)
    ResponseEntity<Iterable<Division>> getDivisions() {
        return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
    }

    @RequestMapping(value = "getSingleDivision/{divId}", method = RequestMethod.GET)
    ResponseEntity<Division> getSingleDivision(@PathVariable long divId) {
        return new ResponseEntity<>(repository.findOne(divId), HttpStatus.OK);
    }

    @RequestMapping(value = "getGrades", method = RequestMethod.GET)
    ResponseEntity<Iterable<Grade>> getGrades(@RequestParam("divisionId") long divisionId) {
        Division target = repository.findOne(divisionId);
        return new ResponseEntity<>(target.getGrades(), HttpStatus.OK);
    }
}
