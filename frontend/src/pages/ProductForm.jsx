import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import * as yup from "yup";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { saveProduct, getProduct } from "../services/productService";
import { toast } from "react-toastify";

function ProductForm() {
  const { Formik } = formik;
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  let setFormValues;

  const schema = yup.object().shape({
    name: yup.string().required().min(5).max(50).trim(),
    description: yup.string().required().min(20).max(2000).trim(),
    imageUrl: yup.string().required().max(2000).trim(),
    price: yup.number().required().min(10).max(999999),
  });

  useEffect(() => {
    if (id === "new") return;

    getData();
  }, []);

  const getData = async () => {
    try {
      const { data } = await getProduct(id);
      setFormValues(data.data);
    } catch (error) {
      if (error.response && error.response.status === 400)
        toast.error(error.response.data.message);
      if (error.response && error.response.status === 404)
        toast.error(error.response.data.message);
    }
  };

  const handleSubmit = async (data, { resetForm }) => {
    try {
      setLoading(true);
      await saveProduct(data);
      resetForm();
      setLoading(false);
      if (data._id) toast.success("Product updated successfully!");
      else toast.success("Product created successfully!");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{ name: "", description: "", imageUrl: "", price: "" }}
    >
      {({ handleSubmit, handleChange, values, touched, errors, setValues }) => {
        setFormValues = setValues;

        return (
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                lg="6"
                controlId="validationFormik01"
                className="mt-3"
              >
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter product name"
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={errors.name}
                  isValid={touched.name && !errors.name}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                {errors.name && (
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <Form.Group
                as={Col}
                lg="6"
                controlId="validationFormik02"
                className="mt-3"
              >
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={1}
                  cols={1}
                  name="description"
                  placeholder="Enter description"
                  value={values.description}
                  onChange={handleChange}
                  isInvalid={errors.description}
                  isValid={touched.description && !errors.description}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                {errors.description && (
                  <Form.Control.Feedback type="invalid">
                    {errors.description}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <Form.Group
                as={Col}
                lg="6"
                controlId="validationFormik03"
                className="mt-3"
              >
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  name="imageUrl"
                  placeholder="Enter image url"
                  value={values.imageUrl}
                  onChange={handleChange}
                  isInvalid={errors.imageUrl}
                  isValid={touched.imageUrl && !errors.imageUrl}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                {errors.imageUrl && (
                  <Form.Control.Feedback type="invalid">
                    {errors.imageUrl}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <Form.Group
                as={Col}
                lg="6"
                controlId="validationFormik04"
                className="mt-3"
              >
                <Form.Label>Price {"(₹)"}</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  placeholder="Enter price"
                  value={values.price}
                  onChange={handleChange}
                  isInvalid={errors.price}
                  isValid={touched.price && !errors.price}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                {errors.price && (
                  <Form.Control.Feedback type="invalid">
                    {errors.price}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Row>
            <Button disabled={loading} type="submit">
              Save
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default ProductForm;
