function SectionHeading({ title, description, action }) {
  return (
    <div className="section-heading">
      <div><h2>{title}</h2>{description ? <p>{description}</p> : null}</div>
      {action}
    </div>
  );
}

export default SectionHeading;
