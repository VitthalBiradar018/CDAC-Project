package com.autocareconnect.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.autocareconnect.entity.Address;

@Repository
public interface AddressDao extends JpaRepository<Address, Integer> {

}