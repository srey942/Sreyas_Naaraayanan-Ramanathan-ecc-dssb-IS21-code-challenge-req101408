import React, { useEffect, useRef, useState } from "react";
import { Modal, Text, Button, Container } from "nextjs-components";
import { Input, Select } from "nextjs-components";
import { Plus } from "nextjs-components/src/icons";
import {
  useAddProduct,
  useGetProductById,
  useUpdateProduct,
} from "@/hooks/useProduct";

const ProductForm = ({ active, onClose, onSubmit, productId, addProduct }) => {
  const [productName, setProductName] = useState("");
  const [scrumMaster, setScrumMaster] = useState("");
  const [productOwner, setProductOwner] = useState("");
  const [developerNameInputValue, setDeveloperNameInputValue] = useState("");
  const [developerNames, setDeveloperNames] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [methodology, setMethodology] = useState("Agile");
  const [location, setGithublocation] = useState(
    "https://github.com/bcgov/citz-imb-wayfinder"
  );
  const [formErrors, setFormErrors] = useState({});
  const inputRef = useRef(null);

  const { data, isLoading, error } = useGetProductById(productId, {
    enabled: !!productId,
  });

  // use update query to update the product
  const { mutate: updateProduct } = useUpdateProduct(productId);

  // use create query to create the product
  const { mutate: createProduct } = useAddProduct();

  useEffect(() => {
    if (data) {
      setProductName(data.productName);
      setScrumMaster(data.scrumMasterName);
      setDeveloperNames(data.developers);
      setProductOwner(data.productOwnerName);
      setStartDate(data.startDate);
      setMethodology(data.methodology);
      setGithublocation(data.location);
    }
  }, [data]);

  const handleAddDeveloperName = () => {
    const newDeveloperName = developerNameInputValue.trim();
    if (newDeveloperName !== "") {
      const newDeveloperNames = [...developerNames, newDeveloperName];
      setDeveloperNames(newDeveloperNames);
      setDeveloperNameInputValue("");
    }
  };

  useEffect(() => {
    return () => {
      if (!active) {
        setProductName("");
        setScrumMaster("");
        setProductOwner("");
        setDeveloperNames([]);
        setStartDate("");
        setMethodology("Agile");
        setGithublocation("https://github.com/bcgov/citz-imb-wayfinder");
        setFormErrors({});
      }
    };
  }, [active]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Create an object to store any validation errors
    const errors = {};

    // Check if the product name field is filled out
    if (!productName) {
      errors.productName = "Product Name is required";
    }

    // Check if the scrum master field is filled out
    if (!scrumMaster) {
      errors.scrumMaster = "Scrum Master is required";
    }

    // Check if the product owner field is filled out
    if (!productOwner) {
      errors.productOwner = "Product Owner is required";
    }

    // Check if at least one developer name is filled out
    if (developerNames.every((name) => name === "")) {
      errors.developerNames = "At least one developer name is required";
    }

    // Check if the start date field is filled out
    if (!startDate) {
      errors.startDate = "Start Date is required";
    }

    // Check if the methodology field is filled out
    if (!methodology) {
      errors.methodology = "Methodology is required";
    }

    // Check if the github location field is filled out
    if (!location) {
      errors.location = "Github is required";
    }

    // Set the formErrors state to the validation errors object
    setFormErrors(errors);
    // If there are no errors, submit the form
    if (Object.keys(errors).length === 0) {
      if (addProduct) {
        createProduct({
          productName,
          scrumMasterName: scrumMaster,
          productOwnerName: productOwner,
          developers: developerNames,
          startDate,
          methodology,
          location,
        });
      } else {
        updateProduct({
          productName,
          scrumMasterName: scrumMaster,
          productOwnerName: productOwner,
          developers: developerNames,
          startDate,
          methodology,
          location,
        });
      }

      onClose();
      onSubmit?.();
    }
  };

  return (
    <>
      {active && (
        <Modal.Modal active={active} onClickOutside={onClose}>
          {isLoading && <Text size={24}>Loading...</Text>}
          {error && <Text size={24}>Error: {error.message}</Text>}
          {!isLoading && !error && (
            <>
              <Modal.Body>
                {addProduct && <Text size={24}>Add Product</Text>}
                {!addProduct && (
                  <Text size={24}>Update Product: {productId}</Text>
                )}
                <div>
                  <Container gap={{ lg: 2 }}>
                    <Input
                      type="text"
                      value={productName}
                      onChange={(event) => setProductName(event.target.value)}
                      label="Product Name"
                      error={formErrors.productName}
                    />

                    <Input
                      type="text"
                      value={scrumMaster}
                      onChange={(event) => setScrumMaster(event.target.value)}
                      label="Scrum Master"
                      error={formErrors.scrumMaster}
                    />

                    <Input
                      type="text"
                      value={productOwner}
                      onChange={(event) => setProductOwner(event.target.value)}
                      label="Product Owner"
                      error={formErrors.productOwner}
                    />

                    <Container>
                      <div>
                        <Input
                          type="text"
                          label="Developer Name"
                          value={developerNameInputValue}
                          onChange={(event) => setDeveloperNameInputValue(event.target.value)}
                          error={formErrors.developerNames}
                        />
                      </div>
                      {developerNames.map((developerName, index) => (
                        <Text size={16} key={index}>
                          {developerName}
                        </Text>
                      ))}
                      <Button
                        onClick={(e) => handleAddDeveloperName(e)}
                        disabled={developerNames.length >= 5 || developerNameInputValue.trim() === ""}
                      >
                        <Plus></Plus>
                      </Button>
                    </Container>

                    <Input
                      typeName="date"
                      value={startDate}
                      onChange={(event) => setStartDate(event.target.value)}
                      label="Start Date"
                      error={formErrors.startDate}
                    />

                    <Select
                      placeholder="Select a methodology"
                      value={methodology}
                      onChange={(event) => setMethodology(event.target.value)}
                      label="Methodology"
                      error={formErrors.methodology}
                    >
                      <option value="Agile">Agile</option>
                      <option value="Waterfall">Waterfall</option>
                    </Select>
                    <Input
                      type="text"
                      value={location}
                      onChange={(event) =>
                        setGithublocation(event.target.value)
                      }
                      label="Location"
                      error={formErrors.location}
                    />
                  </Container>
                </div>
              </Modal.Body>

              <Modal.Actions>
                <Modal.Action onClick={() => onClose()}>Cancel</Modal.Action>
                <Modal.Action onClick={(e) => handleSubmit(e)}>
                  Save
                </Modal.Action>
              </Modal.Actions>
            </>
          )}
        </Modal.Modal>
      )}
    </>
  );
};

export { ProductForm };
