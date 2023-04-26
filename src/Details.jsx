import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ErrorBoundary } from "./ErrorBoundary";
import Carousel from "./Carousel";
import fetchPet from "./fetchPet";

const Details = () => {
  const { id } = useParams();
  const results = useQuery(["details", id], fetchPet);

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">Loading</h2>
      </div>
    );
  }
   const pet = results.data.pets[0];


  return (
    <div className="details">
      <Carousel images={pet.images}></Carousel>
      <div>
        <h1>{pet.name}</h1>
          <h2>{pet.animal} - {pet.breed} - {pet.city}, {pet.state}</h2>
          <button>Adopt {pet.name}</button>
          <p>{pet.descritpion}</p>
      </div>
    </div>
  )
};

function DetailsErrorBoundary() {
  return (
    <ErrorBoundary>
      <Details />
    </ErrorBoundary>
  )
}

export default DetailsErrorBoundary;