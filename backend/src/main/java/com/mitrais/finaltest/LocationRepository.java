package com.mitrais.finaltest;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LocationRepository extends PagingAndSortingRepository<Location,Long>
{

}
