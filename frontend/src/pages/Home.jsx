import { useEffect, useState } from "react";
import WorkoutCard from "../components/WorkoutCard";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  const [workouts, setWorkouts] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const res = await fetch("http://localhost:4000/api/workouts");
      const res_json = await res.json();
      // console.log(res_json);

      if (res.ok) {
        setWorkouts(res_json);
      }
    };

    fetchWorkouts();
  }, []);

  const deleteWorkout = async (id) => {
    const res = await fetch("http://localhost:4000/api/workouts/" + id, {
      method: "DELETE",
    });
    const res_json = await res.json();

    if (res.ok) {
      console.log(res_json);
    }
  };

  return (
    <div className="flex">
      <div className="flex flex-col gap-4">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutCard
              key={workout._id}
              workout={workout}
              deleteWorkout={deleteWorkout}
            />
          ))}
      </div>
      <WorkoutForm/>
    </div>
  );
};

export default Home;
