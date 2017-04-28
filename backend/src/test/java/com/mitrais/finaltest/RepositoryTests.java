package com.mitrais.finaltest;

import com.mitrais.finaltest.division.DivisionRepository;
import com.mitrais.finaltest.employee.Employee;
import com.mitrais.finaltest.employee.EmployeeController;
import com.mitrais.finaltest.employee.EmployeeRepository;
import com.mitrais.finaltest.grade.GradeRepository;
import com.mitrais.finaltest.location.LocationRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.text.ParseException;
import java.text.SimpleDateFormat;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = EmployeeController.class)
public class RepositoryTests {

    @MockBean
    EmployeeRepository employeeRepository;

    @MockBean
    DivisionRepository divisionRepository;

    @MockBean
    GradeRepository gradeRepository;

    @MockBean
    LocationRepository locationRepository;

    @Autowired
    EmployeeController employeeController;

    private MockMvc mockMvc;

    @Before
    public void setup()
    {
        this.mockMvc = MockMvcBuilders
                .standaloneSetup(this.employeeController)
                .build();

        this.employeeRepository.deleteAll();

        Employee target = new Employee();

        target.setEmployeeId((long)1);
        target.setFirstName("Bintoro");
        target.setLastName("Adi Guna");
        target.setGender("Male");

        this.employeeRepository.save(target);

        System.out.println(this.employeeRepository.findOne((long)1));
    }

    @Test
    public void getEmployees() throws Exception
    {
        //You must use double quotes to convert to JSON.
        String result = "[{\n" +
                "  \"employeeId\": 1,\n" +
                "  \"firstName\": \"Bintoro\",\n" +
                "  \"lastName\": \"Adi Guna\",\n" +
                "  \"gender\": \"Male\",\n" +
                "}]";

        String idResult = "{\n" +
                "  \"employeeId\": 1,\n" +
                "  \"firstName\": \"Bintoro\",\n" +
                "  \"lastName\": \"Adi Guna\",\n" +
                "  \"gender\": \"Male\",\n" +
                "  \"photo\": \"\",\n" +
                "  \"status\": \"\",\n" +
                "  \"phoneNo\": \"\",\n" +
                "  \"email\": \"\",\n" +
                "  \"dob\": \"\",\n" +
                "  \"location\": \"\",\n" +
                "  \"hireDate\": \"\",\n" +
                "  \"suspendDate\": \"\",\n" +
                "  \"nationality\": \"\",\n" +
                "  \"maritalStatus\": \"\",\n" +
                "  \"division\": \"\",\n" +
                "  \"grade\": \"\",\n" +
                "  \"subDivision\": \"\"\n" +
                "}";

        this.mockMvc.perform(get("/getEmployees"))
                .andExpect(status().isOk());

        this.mockMvc.perform(get("/getSingleEmployee/100"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void getSingleEmployee() throws Exception
    {
        this.mockMvc.perform(get("/getSingleEmployee/1"))
                .andExpect(status().isOk());
    }
}
