import React from "react";
import ChildCard from "../../CardComponent/ChildCard";
import { Link } from "react-router-dom/cjs/react-router-dom";

const HomeComponent = () => {
  return (
    <div className="flex flex-wrap justify-center">
      <ChildCard
        background="bg-red-200"
        color="text-red-800"
        width="sm:w-1/4"
        padding="p-4"
        margin="m-4"
      >
        <div>
          <Link to='/newmultidataproject'  className="px-3 py-4 lg:py-2 flex  ">
          <span>Create Project</span>
        </Link>
        <p>
        Provides a visualization analysis service that can be implemented according to the uploaded user data.
        </p>
        </div>
      </ChildCard>

      <ChildCard
        background="bg-blue-200"
        color="text-blue-800"
        width="sm:w-1/4"
        padding="p-4"
        margin="m-4"
      >
        <div>
        <h1>View Projects</h1>
        <p>View the List of analysis projects and navigate to the desired project.</p>
        </div>
      </ChildCard>

    </div>
  );
};

export default HomeComponent;
