package com.mitrais.finaltest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
/**
 * Created by Bintoro on 4/20/2017.
 */
@RestController
public class LocationController {

    @Autowired
    private LocationRepository repository;

    @RequestMapping(value = "getLocations", method = RequestMethod.GET)
    ResponseEntity<Iterable<Location>> getLocations() {
        return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
    }

    @RequestMapping(value = "getSingleLocation/{locId}", method = RequestMethod.GET)
    ResponseEntity<Location> getSingleLocation(@PathVariable long locId)
    {
        return new ResponseEntity<>(repository.findOne(locId), HttpStatus.OK);
    }
}
