
const CoachesCard = ({ coach }) => {
    return (
        <div className="card">
            
                <h2>{coach.name}</h2>
                <p>{coach.description}</p>
           
        </div>
    );
};
export default CoachesCard;