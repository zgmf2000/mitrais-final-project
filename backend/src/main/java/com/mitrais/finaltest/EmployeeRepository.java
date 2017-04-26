package com.mitrais.finaltest;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface EmployeeRepository extends PagingAndSortingRepository<Employee,Long>
{
    public List<Employee> findByGender(@Param("gender") String gender);

    @Transactional
    public void deleteByEmployeeId (@Param("empId") long employeeId);
}
