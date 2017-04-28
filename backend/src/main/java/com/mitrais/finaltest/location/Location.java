package com.mitrais.finaltest.location;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mitrais.finaltest.employee.Employee;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Bintoro on 4/19/2017.
 */
@Entity
public class Location {

    public Location(){}

    public long getLocationId() {
        return locationId;
    }

    public void setLocationId(long locationId) {
        this.locationId = locationId;
    }

    public String getLocationName() {
        return locationName;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "location_id", nullable = false)
    private long locationId;
    @Column(name = "location_name", nullable = false)
    private String locationName;

    @OneToMany(mappedBy = "location", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Employee> employees;

    public List<Employee> getEmployees() {
        return employees;
    }

    public void setEmployees(List<Employee> employees) {
        this.employees = employees;
    }

    public void addEmployee(Employee employee) {
        if (employees == null)
            employees = new ArrayList<>();

        employees.add(employee);
    }

}
