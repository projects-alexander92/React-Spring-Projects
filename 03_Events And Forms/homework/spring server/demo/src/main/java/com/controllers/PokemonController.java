package com.controllers;

import com.entetiies.ORM.Pokemon;
import com.entetiies.models.PokemonBindingModel;
import com.services.PokemonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PokemonController
{
    private final PokemonService pokemonService;

    @Autowired
    public PokemonController(PokemonService pokemonService)
    {
        this.pokemonService = pokemonService;
    }

    @PostMapping(value = "/pokemon/add")
    public ResponseEntity addPokemon(@Valid @RequestBody PokemonBindingModel pokemonBindingModel, BindingResult bindingResult)
    {
        if (bindingResult.hasErrors())
        {
            return new ResponseEntity(HttpStatus.NOT_ACCEPTABLE);
        }
        Pokemon pokemon = this.pokemonService.addPokemon(pokemonBindingModel);
        return new ResponseEntity<>(pokemon, HttpStatus.OK);
    }

    @GetMapping(value = "/pokemon/all")
    public ResponseEntity getAllPokemons()
    {
        List<Pokemon> allPokemons = this.pokemonService.getAllPokemons();
        return new ResponseEntity<>(allPokemons, HttpStatus.OK);
    }
}
