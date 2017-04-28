package com.mitrais.finaltest.grade;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mitrais.finaltest.division.Division;
import com.mitrais.finaltest.employee.Employee;

import javax.persistence.*;
import java.util.List;

/**
 * Created by Bintoro on 4/19/2017.
 */
@Entity
public class Grade {

    public Grade() {}

    public long getGradeId() {
        return gradeId;
    }

    public void setGradeId(long gradeId) {
        this.gradeId = gradeId;
    }

    public Division getDivison() {
        return division;
    }

    public void setDivision(Division division) {
        this.division = division;
    }

    public String getGradeCode() {
        return gradeCode;
    }

    public void setGradeCode(String gradeCode) {
        this.gradeCode = gradeCode;
    }

    public String getGradeName() {
        return gradeName;
    }

    public void setGradeName(String gradeName) {
        this.gradeName = gradeName;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "grade_id")
    private long gradeId;

    @ManyToOne
    @JoinColumn (name = "grade_division_id", nullable = false)
    private Division division;

    @Column(name = "grade_code", nullable = false)
    private String gradeCode;

    @Column(name = "grade_name", nullable = false)
    private String gradeName;

    @OneToMany(mappedBy = "grade", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Employee> employees;

    public void setEmployees(List<Employee> employees) { this.employees = employees; }

    public List<Employee> getEmployees() { return employees; }
}
