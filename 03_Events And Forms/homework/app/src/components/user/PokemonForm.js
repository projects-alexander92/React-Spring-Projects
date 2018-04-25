import React, {Component} from 'react';
import Input from "../common/Input";
import ajax from '../../ajax/getAjax'
import $ from 'jquery'

class PokemonForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pokemonModel: {
                pokemonName: '',
                pokemonImageUrl: '',
                pokemonInfo: ''
            },
            fieldClasses: {
                pokemonName: 'form-control',
                pokemonImage: 'form-control',
                pokemonInfo: 'form-control'
            },
            allPokemons: [],
            pokemonErrorMsg: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitPokemonForm = this.submitPokemonForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }

    handleInputChange(ev) {
        const target = ev.target;
        const name = target.name;
        const value = target.value;
        let pokemonModel = this.state.pokemonModel;
        pokemonModel[name] = value;
        this.setState({
            pokemonModel: pokemonModel,
        });
    }

    submitPokemonForm(ev) {
        ev.preventDefault();
        let pokemon = this.state.pokemonModel;
        let fieldClasses = this.state.fieldClasses;
        let sendAjax = true;

        //validate the user
        for (let key in fieldClasses) {
            fieldClasses[key] = 'form-control';
        }
        if (pokemon.pokemonName.length < 5) {
            fieldClasses.pokemonName = 'form-control is-invalid';
            sendAjax = false;
        }

        if (pokemon.pokemonImageUrl === '') {
            fieldClasses.pokemonImage = 'form-control is-invalid';
            sendAjax = false;
        }

        if (pokemon.pokemonInfo.length < 10) {
            fieldClasses.pokemonInfo = 'form-control is-invalid';
            sendAjax = false;
        }
        this.setState({
            fieldClasses: fieldClasses
        });


        if (sendAjax) {
            let data = pokemon;
            let token = sessionStorage.getItem("userToken");
            ajax.post("pokemon/add", data, token).then((e) => {
                let allPokemons = this.state.allPokemons;
                allPokemons.push(e);
                this.setState({
                    allPokemons: allPokemons,
                    pokemonErrorMsg:""
                })
            }).catch(() => {
                this.setState({
                    pokemonErrorMsg:"Pokemon with this name allrdy exists"
                })
            });
        }


    }

    componentDidMount() {
        let token = sessionStorage.getItem("userToken");
        if (token === null) {
            this.props.history.push("/login")
        }
        ajax.get("pokemon/all", "json", token).then((response) => {
            this.setState({
                allPokemons: response
            })
        })
    }

    changeUser(ev) {
        ev.preventDefault();
        sessionStorage.clear();
        this.props.history.push("/login")
    }

    render() {
        if (sessionStorage.getItem('userToken') === null) {
            this.props.history.push("/login")
        }
        let pokemonData = this.state.allPokemons.map((e) => {
            return (
                <div className="card col-md-3 mr-2 my-2" key={e.id}>
                    <div className="card-body">
                        <h5 className="card-title">{e.pokemonName}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Pokemon info</h6>
                        <p className="card-text">{e.pokemonInfo}</p>
                        <img src={e.pokemonImageUrl} alt="image not found" className="card-link"/>
                    </div>
                </div>
            )
        });

        return (
            <div>
                <div className='row justify-content-md-center'>
                    <h3>Logged in</h3>
                </div>
                <div className='row justify-content-md-center'>
                    <h3 style={errorStyle}>{this.state.pokemonErrorMsg}</h3>
                </div>
                <div className='row justify-content-md-center'>
                    <form className='col-md-4'>
                        <Input inputType={'text'}
                               fieldAttributes={'pokemonName'}
                               labelValue={'Enter pokemon name'}
                               fieldValue={this.state.pokemonModel.pokemonName}
                               onChange={this.handleInputChange}
                               fieldClass={this.state.fieldClasses.pokemonName}
                               errorMsg={'Must be at least 5 symbols long'}/>

                        <Input inputType={'text'}
                               fieldAttributes={'pokemonImageUrl'}
                               labelValue={'Enter pokemon pokemon Image'}
                               fieldValue={this.state.pokemonModel.pokemonImageUrl}
                               onChange={this.handleInputChange}
                               fieldClass={this.state.fieldClasses.pokemonImage}
                               errorMsg={'Please provide a valid image url'}/>

                        <Input inputType={'text'}
                               fieldAttributes={'pokemonInfo'}
                               labelValue={'Enter pokemon info'}
                               fieldValue={this.state.pokemonModel.pokemonInfo}
                               onChange={this.handleInputChange}
                               fieldClass={this.state.fieldClasses.pokemonInfo}
                               errorMsg={'atl east 10 characters long'}/>

                        <button className="btn btn-outline-warning btn-block" type="submit"
                                onClick={this.submitPokemonForm}>Add Pokemon
                        </button>
                        <button className="btn btn-outline-danger btn-block" type="submit"
                                onClick={this.changeUser}>Log in as another user
                        </button>
                    </form>
                </div>

                <div className='row justify-content-md-center'>
                    {pokemonData}
                </div>
            </div>
        )
    }
}
const errorStyle = {
    color: '#dc3545'
};
export default PokemonForm;