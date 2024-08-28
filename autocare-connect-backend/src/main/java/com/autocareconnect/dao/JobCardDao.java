package com.autocareconnect.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.autocareconnect.entity.JobCard;

@Repository
public interface JobCardDao extends JpaRepository<JobCard, Integer>{

}
