import Navbar from "../Navbar/Navbar";
import SimpleSlider from "../showcase/Showcase";
import classes from "./Homepage.module.css";

export default function Homepage({ cartItems }) {
  return (
    <>
      <Navbar cartItems={cartItems} />
      <main className={classes.home}>
        <section className={classes.hero}>
          <h1>KPX Urban Store</h1>
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua.
          </p>
        </section>

        <section className={classes.slider}>
          <SimpleSlider />
        </section>

        <section className={classes.cta}>
          <p>Visit our Store Now!</p>
        </section>
      </main>
    </>
  );
}
