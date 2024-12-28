
const CoachesCard = ({ coach }) => {
    return (
        <article>
        <header>
          <h2>{coach.name}</h2>
        </header>
        <section>
          <p>{coach.description}</p>
        </section>
      </article>
    );
};
export default CoachesCard;