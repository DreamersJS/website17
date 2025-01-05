import { motion } from "framer-motion";

const item = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0 },
};

const CoachesCard = ({ coach }) => {
    return (
      <motion.div
        variants={item}>
        <article>
        <header>
          <h2>{coach.name}</h2>
        </header>
        <section>
          <p>{coach.description}</p>
        </section>
      </article>
      </motion.div>
    );
};
export default CoachesCard;