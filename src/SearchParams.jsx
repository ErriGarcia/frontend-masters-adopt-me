import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useBreedList from "./useBreedList";
import Results from "./Results";
import fetchSearch from "./fetchSearch";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
    const [requestParams, setRequestParams] = useState({
        location: "",
        animal: "",
        breed: ""
    });
    const [animal, setAnimal] = useState("");
    const [breeds] = useBreedList(animal);

    // useEffect(() => {
    //     requestPets();
    // }), [];

    // async function requestPets() {
    //     const res = await fetch(
    //         `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    //     );
    //     const json = await res.json();

    //     setPets(json.pets);
    // };

    const results = useQuery(["search", requestParams], fetchSearch);
    const pets = results?.data?.pets ?? []

    return (
        <div className="search-params">
            <form onSubmit={e => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const obj = {
                    animal: formData.get("animal"),
                    breed: formData.get("breed"),
                    location: formData.get("location"),
                };
                setRequestParams(obj);
            }}>
                <label htmlFor="location">
                    Location
                    <input
                        name="location" 
                        id="location" 
                        placeholder="location" />
                </label>
                <label htmlFor="animal">
                    Animal
                    <select 
                        name="animal" 
                        id="animal"
                        onChange={e => {
                            setAnimal(e.target.value)
                        }}
                    >
                        <option />
                        {ANIMALS.map(animal => {
                            <option key={animal}>{animal}</option>
                        })}
                    </select>
                </label>
                <label htmlFor="breed">
                    breed
                    <select 
                        name="breed" 
                        id="breed"
                        disabled={breeds.length === 0}
                    >
                        <option />
                        {breeds.map(breed => {
                            <option key={breed}>{breed}</option>
                        })}
                    </select>
                </label>
                <button>Submit</button>
            </form>
            <Results pets={pets}></Results>
        </div>
    )
};

export default SearchParams;