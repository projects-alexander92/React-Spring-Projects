package com.repositories;

import com.entetiies.ORM.Pokemon;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PokemonRepository extends CrudRepository<Pokemon, Long>
{
    @Query("select p from pokemons as p")
    List<Pokemon> findAllBy();

    Pokemon findByPokemonName(String name);
}
