export default function ShowcaseItem({ item }) {
  return (
    <div>
      <img src={item.image} alt={item.title} />
      <h2>{item.title}</h2>
    </div>
  );
}
