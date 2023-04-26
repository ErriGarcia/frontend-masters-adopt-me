import Pet from "./Pet";

const Results = ({ pets }) => {
    return (
        <div>
            {!pets.length ? (
                <h1>No Pets Found</h1>
            ) : (
                pets.map(pet => (
                    <Pet
                        animal={pet.animal}
                        id={pet.id}
                        name={pet.name}
                        breed={pet.breed}
                        key={pet.id}
                        images={pet.images}
                        location={`${pet.city}, ${pet.state}`}
                    />
                ))
            )}
        </div>
    );
};

export default Results;