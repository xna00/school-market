const Icon = (props: any) => {
  return (
    <svg class="icon" aria-hidden="true">
      <use xlinkHref={"#icon-" + props.name} />
    </svg>
  );
};
export default Icon;
