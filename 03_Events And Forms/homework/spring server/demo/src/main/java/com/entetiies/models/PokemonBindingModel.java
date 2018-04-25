package com.entetiies.models;

import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class PokemonBindingModel
{
    @Size(min = 5)
    private String pokemonName;
    @Size(min = 10)
    private String pokemonInfo;
    @NotBlank
    private String pokemonImageUrl;

    public PokemonBindingModel()
    {
    }

    public String getPokemonName()
    {
        return pokemonName;
    }

    public void setPokemonName(String pokemonName)
    {
        this.pokemonName = pokemonName;
    }

    public String getPokemonInfo()
    {
        return pokemonInfo;
    }

    public void setPokemonInfo(String pokemonInfo)
    {
        this.pokemonInfo = pokemonInfo;
    }

    public String getPokemonImageUrl()
    {
        return pokemonImageUrl;
    }

    public void setPokemonImageUrl(String pokemonImageUrl)
    {
        this.pokemonImageUrl = pokemonImageUrl;
    }
}
