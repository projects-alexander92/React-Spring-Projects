package com.repositories;

import com.entetiies.ORM.Comment;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends CrudRepository<Comment, Long> {

    @Query("select c from comments as c where c.link.id = :id")
    List<Comment> getAllByLinksWithId(@Param("id") long id);

    @Query("select c from comments as c where c.user.id = :id")
    List<Comment> getAllByUserId(@Param("id") long id);

    void deleteByLink_Id(long id);
}
