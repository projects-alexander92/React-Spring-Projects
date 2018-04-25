package com.services;

import com.entetiies.ORM.Pokemon;
import com.entetiies.models.PokemonBindingModel;

import java.util.List;
import java.util.Set;

public interface PokemonService
{
    Pokemon addPokemon(PokemonBindingModel pokemonBindingModel);

    List<Pokemon> getAllPokemons();
}
