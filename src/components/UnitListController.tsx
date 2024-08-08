import React from 'react';

// Component to display list of units
function UnitListController({ units, onUnitClick }) {
  return (
    <div className="PropertyListController">
      {units.length === 0 ? <p>No units available</p> : (
        units.map((unit) => (
          <UnitListRow
            key={unit.id}
            unit={unit}
            onClick={() => onUnitClick(unit.id)}
          />
        ))
      )}
    </div>
  );
}

// Component for each unit row
function UnitListRow({ unit, onClick }) {
  return (
    <div className="property-row" onClick={onClick}>
      <UnitRowItem item={unit} />
    </div>
  );
}

// Component to display details of a unit
function UnitRowItem({ item }) {
  return (
    <div className="property-item">
      <div className="image">
        <img src="https://placehold.co/60x60/png" alt="Unit" />
      </div>
      <div className="name">
        <small className="text-muted">Unit Number</small>
        <br />
        <b>{item.unitNumber}</b>
      </div>
      <div className="detail">
        <small className="text-muted">Square Feet</small>
        <br />
        <small>{item.squareFeet}</small>
      </div>
      <div className="detail">
        <small className="text-muted">Rent Amount</small>
        <br />
        <small>${item.rentAmount}</small>
      </div>
      <div className="detail">
        <small className="text-muted">Occupied</small>
        <br />
        <small>{item.occupied ? 'Yes' : 'No'}</small>
      </div>
      <div className="arrow">
        <span className="material-symbols-outlined">chevron_right</span>
      </div>
    </div>



        //   <div className="property-item">
        //   <div className="image">
        //     <img src="https://placehold.co/60x60/png" />
        //   </div>
        //   <div className="name">
        //     <small className="text-muted">UnitNumber</small>
        //     <br />
        //     <b>{item.unitNumber}</b>
        //   </div>
        //   <div className="detail">
        //     <small className="text-muted">SquareFeet</small>
        //     <br />
        //     <small>{item.squareFeet}</small>
        //   </div>
        //   <div className="detail">
        //     <small className="text-muted">RentAmount</small>
        //     <br />
        //     <small>{item.rentAmount}</small>
        //   </div>
         
        //   <div className="arrow">
        //     <span className="material-symbols-outlined">chevron_right</span>
        //   </div>
        // </div>
  );
}

export default UnitListController;
