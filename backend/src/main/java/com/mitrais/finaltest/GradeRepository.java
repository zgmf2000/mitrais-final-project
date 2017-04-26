package com.mitrais.finaltest;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface GradeRepository extends PagingAndSortingRepository<Grade,Long>
{
}
