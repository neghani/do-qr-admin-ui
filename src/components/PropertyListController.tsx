import "./PropertyListController.css";
function PropertyListController() {
  return (
    <div className="PropertyListController container">
      <PropertyListRow></PropertyListRow>
    </div>
  );
}

function PropertyListRow() {
  return (
    <div className="row property-row">
      <div className="col">1</div>
      <div className="col">2</div>
      <div className="col last-col">3</div>
      <div className="col action button">
        <span class="material-symbols-outlined">arrow_drop_down</span>
      </div>
      <div className="details">
        <h1>Azadi</h1>
      </div>
    </div>
  );
}
export default PropertyListController;
