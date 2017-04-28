package com.mitrais.finaltest.employee;

import com.mitrais.finaltest.grade.Grade;
import com.mitrais.finaltest.location.Location;
import com.mitrais.finaltest.division.Division;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * Created by trainee on 18/04/2017.
 */
@Entity
@Table(name="employee")
public class Employee implements Serializable
{
    public Employee() {}

    public long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(long employeeId) {
        this.employeeId = employeeId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public Date getHireDate() {
        return hireDate;
    }

    public void setHireDate(Date hireDate) {
        this.hireDate = hireDate;
    }

    public Date getSuspendDate() {
        return suspendDate;
    }

    public void setSuspendDate(Date suspendDate) {
        this.suspendDate = suspendDate;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public String getMaritalStatus() {
        return maritalStatus;
    }

    public void setMaritalStatus(String maritalStatus) {
        this.maritalStatus = maritalStatus;
    }

    public Division getDivision() {
        return division;
    }

    public void setDivision(Division division) {
        this.division = division;
    }

    public Grade getGrade() {
        return grade;
    }

    public void setGrade(Grade grade) {
        this.grade = grade;
    }

    public String getSubDivision() {
        return subDivision;
    }

    public void setSubDivision(String subDivision) {
        this.subDivision = subDivision;
    }

    @Id
    @Column(name="employee_id")
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long employeeId;
    @Column(name="employee_first_name", nullable = false)
    private String firstName;
    @Column(name="employee_last_name", nullable = false)
    private String lastName;
    @Column(name="employee_gender", nullable = false)
    private String gender;
    @Column(name="employee_photo")
    private String photo;
    @Column(name="employee_status")
    private String status;
    @Column(name="employee_phone_no")
    private String phoneNo;
    @Column(name = "employee_email")
    private String email;
    @Column(name="employee_dob")
    private Date dob;
    @ManyToOne()
    @JoinColumn(name = "employee_location_id")
    private Location location;
    @Column(name = "employee_hire_date")
    private Date hireDate;
    @Column(name = "employee_suspend_date")
    private Date suspendDate;
    @Column(name = "employee_nationality")
    private String nationality;
    @Column(name = "employee_marital_status")
    private String maritalStatus;
    @ManyToOne
    @JoinColumn(name = "employee_division_id")
    private Division division;
    @ManyToOne
    @JoinColumn(name = "employee_grade_id")
    private Grade grade;
    @Column(name = "employee_sub_division")
    private String subDivision;

    public Location getLocation()
    {
        return location;
    }

    public void setLocation(Location location)
    {
        this.location = location;
    }
}


