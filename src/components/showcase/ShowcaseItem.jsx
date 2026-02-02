import classes from "./Showcase.module.css";

export default function ShowcaseItem({ item }) {
  return (
    <div className={classes.itemContainer}>
      <img src={item.image} alt={item.title} />
      <h2>{item.title}</h2>
    </div>
  );
}
