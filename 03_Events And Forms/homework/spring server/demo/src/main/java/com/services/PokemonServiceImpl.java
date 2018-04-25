package com.services;

import com.entetiies.ORM.Pokemon;
import com.entetiies.models.PokemonBindingModel;
import com.exceptions.PokemonAllrdyExistsException;
import com.repositories.PokemonRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class PokemonServiceImpl implements PokemonService
{
    private final PokemonRepository pokemonRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public PokemonServiceImpl(PokemonRepository pokemonRepository, ModelMapper modelMapper)
    {
        this.pokemonRepository = pokemonRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public Pokemon addPokemon(PokemonBindingModel pokemonBindingModel)
    {
        //check if such pokemon allrdy exists
        if (this.pokemonRepository.findByPokemonName(pokemonBindingModel.getPokemonName()) != null)
        {
            throw  new PokemonAllrdyExistsException("Pokemon with this name allrdy exists");
        }

        //save the pokemon to get his id
        Pokemon pokemon = this.modelMapper.map(pokemonBindingModel, Pokemon.class);
        this.pokemonRepository.save(pokemon);
        //Return pokemon with id
        pokemon = this.pokemonRepository.findByPokemonName(pokemon.getPokemonName());
        return pokemon;
    }

    @Override
    public List<Pokemon> getAllPokemons()
    {
        List<Pokemon> pokemons = this.pokemonRepository.findAllBy();
        return pokemons;
    }

}
