package com.mitrais.finaltest.employee;

import com.mitrais.finaltest.grade.Grade;
import com.mitrais.finaltest.grade.GradeRepository;
import com.mitrais.finaltest.location.Location;
import com.mitrais.finaltest.location.LocationRepository;
import com.mitrais.finaltest.division.Division;
import com.mitrais.finaltest.division.DivisionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * Created by Bintoro on 4/20/2017.
 */
@RestController
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private LocationRepository locationRepository;
    @Autowired
    private DivisionRepository divisionRepository;
    @Autowired
    private GradeRepository gradeRepository;

    @RequestMapping(value = "getEmployees", method = RequestMethod.GET)
    ResponseEntity<Iterable<Employee>> getEmployees() {
        return new ResponseEntity<>(employeeRepository.findAll(), HttpStatus.OK);
    }

    @RequestMapping(value = "filterEmployee", method = RequestMethod.GET)
    ResponseEntity<Iterable<Employee>> getFilteredEmployees(@RequestParam String gender, @RequestParam long locationId) {
        if (gender.equals("All") && locationId == 0)
            return getEmployees();
        else if (gender.equals("All") && locationId > 0)
        {
            Location location = locationRepository.findOne(locationId);
            return new ResponseEntity<>(location.getEmployees(), HttpStatus.OK);
        }
        else if (!gender.equals("All") && locationId == 0)
            return new ResponseEntity<>(employeeRepository.findByGender(gender), HttpStatus.OK);
        else
        {
            Location location = locationRepository.findOne(locationId);
            List<Employee> employees = location.getEmployees();
            employees.removeIf(e->!e.getGender().equals(gender));
            return new ResponseEntity<>(employees, HttpStatus.OK);
        }
    }

    @RequestMapping(value = "getSingleEmployee/{employeeId}", method = RequestMethod.GET)
    ResponseEntity<Employee> getSingleEmployee(@PathVariable long employeeId) {
        if (!employeeRepository.exists(employeeId))
            return new ResponseEntity<>(new Employee(), HttpStatus.NOT_FOUND);
        else
            return new ResponseEntity<>(employeeRepository.findOne(employeeId), HttpStatus.OK);
    }

    @RequestMapping(value="modifyEmployee", method = RequestMethod.POST)
    ResponseEntity<Employee> modifyEmployee(@RequestParam(required = false) Long empId, @RequestParam String firstName, @RequestParam String lastName,
                                       @RequestParam String gender, @RequestParam(required = false) MultipartFile photo,
                                       @RequestParam(required = false) String status, @RequestParam long locationId,
                                       @RequestParam String phoneNo, @RequestParam String email, @RequestParam String dob,
                                       @RequestParam(required = false) String suspendDate, @RequestParam String hireDate,
                                       @RequestParam String nationality, @RequestParam long gradeId, @RequestParam String maritalStatus,
                                       @RequestParam long divisionId, @RequestParam(required = false) String subDivision)
    {
        Location targetLocation = locationRepository.findOne(locationId);
        Division targetDivision = divisionRepository.findOne(divisionId);
        Grade targetGrade = gradeRepository.findOne(gradeId);
        Employee target;

        if (empId!=null)
            target = employeeRepository.findOne(empId);
        else
            target = new Employee();

        if (!photo.isEmpty())
        {
            String[] matches = {"jpeg", "png"};
            String fileMimeType = photo.getContentType();

            if (!fileMimeType.contains("jpeg") && !fileMimeType.contains("png"))
                return new ResponseEntity<>(target, HttpStatus.UNSUPPORTED_MEDIA_TYPE);
            else
            {
                String extension;
                if (fileMimeType.contains("jpeg"))
                    extension = ".jpg";
                else
                    extension = ".png";

                String filename = UUID.randomUUID().toString().concat(extension);
                File targetFile = new File("./../frontend/src/assets/" + filename);

                try
                {
                    targetFile.createNewFile();
                    photo.transferTo(targetFile.getAbsoluteFile());

                    //Delete Old Photo
                    if (target.getPhoto() != null)
                        new File("./../frontend/src/assets/" + target.getPhoto()).getAbsoluteFile().delete();

                    target.setPhoto(filename);
                }
                catch (IOException e)
                {
                    e.printStackTrace();
                    return new ResponseEntity<>(target, HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
        }

        target.setFirstName(firstName);
        target.setLastName(lastName);

        try
        {
            Date birthDate = new SimpleDateFormat("yyyy-MM-dd").parse(dob);
            Date hireDateFormatted = new SimpleDateFormat("yyyy-MM-dd").parse(hireDate);
            target.setDob(birthDate);
            target.setHireDate(hireDateFormatted);

            if (suspendDate != null && suspendDate != "")
            {
                Date suspendDateFormatted = new SimpleDateFormat("yyyy-MM-dd").parse(suspendDate);
                target.setSuspendDate(suspendDateFormatted);
            }
        }
        catch (ParseException e)
        {
            e.printStackTrace();
            return new ResponseEntity<>(target, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        target.setEmail(email);
        target.setGender(gender);
        target.setMaritalStatus(maritalStatus);
        target.setNationality(nationality);
        target.setPhoneNo(phoneNo);
        if (status != null)
            target.setStatus(status);
        if (subDivision != null)
            target.setSubDivision(subDivision);
        target.setDivision(targetDivision);
        target.setLocation(targetLocation);
        target.setGrade(targetGrade);

        employeeRepository.save(target);

        return new ResponseEntity<>(target, HttpStatus.OK);
    }

    @RequestMapping(value = "modifyEmployee/{employeeId}", method = RequestMethod.DELETE)
    ResponseEntity<String> deleteSingleEmployee(@PathVariable long employeeId) {
        employeeRepository.deleteByEmployeeId(employeeId);
        return new ResponseEntity<>("Delete operation successful.", HttpStatus.OK);
    }
}
