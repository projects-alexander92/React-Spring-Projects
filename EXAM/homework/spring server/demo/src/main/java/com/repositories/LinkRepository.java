package com.repositories;

import com.entetiies.ORM.Link;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LinkRepository extends CrudRepository<Link, Long> {

    List<Link> getAllBy();

    @Query("select l from links as l where l.user.username = :username")
    List<Link> getAllByUsername(@Param("username") String username);
}
