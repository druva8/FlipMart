import React from "react";

const AddressBlock = ({ title, address }) => (
  <div>
    <h3>{title}</h3>
    <p>{address.name}</p>
    <p>{address.street}</p>
    <p>
      {address.city}, {address.state}
    </p>
    <p>{address.zip}</p>
    <p>{address.country}</p>
    <p>{address.phone}</p>
    <p>{address.email}</p>
  </div>
);

export default AddressBlock;
