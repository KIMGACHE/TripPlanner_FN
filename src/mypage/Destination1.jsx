import { useLocation } from "react-router-dom";

const Destination1 = () => {
  const location = useLocation();
  const { plannerID, plannerItem } = location.state || {};

  useEffect(() => {
    if (plannerID) {
      axios
        .get(`http://localhost:9000/planner/board/destination?plannerID=${plannerID}`)
        .then((response) => {
          setDestinations(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [plannerID]);

  return (
    <div>
      <h1>{plannerItem?.plannerTitle}</h1>
      <p>Planner ID: {plannerID}</p>
      
    </div>
  );
};

export default Destination1;
