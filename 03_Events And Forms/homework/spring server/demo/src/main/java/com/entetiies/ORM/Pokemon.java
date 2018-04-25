package com.entetiies.ORM;

import javax.persistence.*;

@Entity(name = "pokemons")
public class Pokemon
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String pokemonName;
    private String pokemonInfo;
    private String pokemonImageUrl;

    public Pokemon()
    {
    }

    public Long getId()
    {
        return id;
    }

    public void setId(Long id)
    {
        this.id = id;
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
