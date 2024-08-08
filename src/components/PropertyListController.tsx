import "./PropertyListController.css";

function PropertyListController({ properties, onPropertyClick }) {
  return (
    <div className="PropertyListController">
      {properties.length === 0 ? "No properties" : ""}
      {properties.map((property:any) => (
        <PropertyListRow
          key={property?.id}
          property={property}
          onPropertyClick={onPropertyClick}
        />
      ))}
    </div>
  );
}

function PropertyListRow({ property, onPropertyClick }) {
  return (
    <div className="property-row" onClick={() => onPropertyClick(property.id)}>
      <PropertyRowItem item={property} />
    </div>
  );
}

function PropertyRowItem({ item }) {
  return (
    <div className="property-item">
      <div className="image">
        <img src="https://placehold.co/60x60/png" alt="Property" />
      </div>
      <div className="name">
        <small className="text-muted">Name</small>
        <br />
        <b>{item.propertyName}</b>
      </div>
      <div className="detail">
        <small className="text-muted">Location</small>
        <br />
        <small>{item.address}</small>
      </div>
      <div className="arrow">
        <span className="material-symbols-outlined">chevron_right</span>
      </div>
    </div>
  );
}

export default PropertyListController;
