package com.mitrais.finaltest;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Bintoro on 4/19/2017.
 */
@Entity
public class Division {

    public Division() {}

    public long getDivisionId() {
        return divisionId;
    }

    public void setDivisionId(long divisionId) {
        this.divisionId = divisionId;
    }

    public String getDivisionCode() {
        return divisionCode;
    }

    public void setDivisionCode(String divisionCode) {
        this.divisionCode = divisionCode;
    }

    public String getDivisionName() {
        return divisionName;
    }

    public void setDivisionName(String divisionName) {
        this.divisionName = divisionName;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "division_id")
    private long divisionId;

    @Column(name = "division_code", nullable = false)
    private String divisionCode;

    @Column(name = "division_name", nullable = false)
    private String divisionName;

    @OneToMany(mappedBy = "division", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Employee> employees;

    public List<Employee> getEmployees() { return employees; }

    public void setEmployees(List<Employee> employees) { this.employees = employees; }

    public void addEmployee(Employee employee) {
        if (employee != null)
        {
            if (employees == null)
                employees = new ArrayList<>();

            employees.add(employee);
            employee.setDivision(this);
        }
    }

    @OneToMany(mappedBy = "division", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Grade> grades;

    public List<Grade> getGrades() { return grades; }

    public void setGrades(List<Grade> grades) { this.grades = grades; }

    @Override
    public String toString()
    {
        return divisionName;
    }

}
