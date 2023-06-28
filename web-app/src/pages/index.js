import { ProductForm } from "@/components/product-form/product-form";
import { useGetAllProducts } from "@/hooks/useProduct";
import {
  Button,
  Table,
  Stack,
  Container,
  Text,
  SearchInput,
} from "nextjs-components";
import { Edit } from "nextjs-components/src/icons";
import { useState } from "react";
import { useQueryClient } from "react-query";

const columns = [
  {
    Header: "Product ID",
    accessor: "productId",
  },
  {
    Header: "Product Name",
    accessor: "productName",
  },
  {
    Header: "Product Owner",
    accessor: "productOwnerName",
  },
  {
    Header: "Developers",
    accessor: "Developers",
  },
  {
    Header: "Scrum Master",

    accessor: "scrumMasterName",
  },
  {
    Header: "Start Date",
    accessor: "startDate",
  },
  {
    Header: "Methodology",
    accessor: "methodology",
  },
  {
    Header: "Location",
    accessor: "location",
  },
  {
    Header: "Edit",
    accessor: "actions",
  },
];

export default function Home() {
  const [modalActive, setModalActive] = useState(false);
  const [productId, setProductId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchErrors, setSearchErrors] = useState(null);
  const [actualSearchTerm, setActualSearchTerm] = useState(null);

  const {
    data: products,
    isLoading,
    isFetching,
  } = useGetAllProducts(actualSearchTerm);
  const queryClient = useQueryClient();

  if (isLoading) return <div>Loading</div>;

  const handleEditModal = (id) => {
    setProductId(id);
    setModalActive(true);
  };

  const handleAddProduct = () => {
    setProductId(null);
    setModalActive(true);
  };

  const data = products.map((product) => {
    return {
      productId: product.productId,
      productName: product.productName,
      productOwnerName: product.productOwnerName,
      Developers: product.developers,
      scrumMasterName: product.scrumMasterName,
      startDate: product.startDate,
      methodology: product.methodology,
      location: product.location,
      actions: (
        <Stack gap={{ lg: 2 }} direction={{ sm: "column", lg: "row" }}>
          <Button
            size="small"
            shape="square"
            type="secondary"
            title="Edit"
            onClick={() => handleEditModal(product.productId)}
          >
            <Edit />
          </Button>
        </Stack>
      ),
    };
  });

  return (
    <Container style={{ widht: "100%", height: "100%", marginTop: "5px" }}>
      <Container row>
        <Container flex={3} style={{ alignSelf: "flex-start", margin: 10 }}>
          <Text size={16}>Total number of Products: {data.length}</Text>
        </Container>
        <Container flex={1} style={{ alignSelf: "flex-end" }}>
          <Button onClick={() => handleAddProduct()}>Add Product</Button>
        </Container>
      </Container>
      <Container>
        <Table columns={columns} data={data} caption="A basic table." />
        <ProductForm
          active={modalActive}
          onClose={() => {
            setModalActive(false);
            setProductId(null);
          }}
          productId={productId}
          addProduct={!productId}
        />
      </Container>
    </Container>
  );
}
